#!/usr/bin/env node

import * as git from './git';
import { loadConfig } from './config';
import { error, log } from './log';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  try {
    const gitRoot = git.getRoot();
    const branch = await git.getBranchName(gitRoot);
    const config = await loadConfig();
    const ticket = git.getJiraTicket(branch, config);

    if (ticket) {
      log(`🎫 Adding \x1B[1mJIRA\x1B[22m ticket ID ${config.jiraHost}/browse/${ticket}`);
      git.writeJiraTicket(ticket, config);
    }
  } catch (err) {
    error(err);
  }
})();
