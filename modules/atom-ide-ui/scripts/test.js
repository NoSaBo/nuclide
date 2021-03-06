#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @noflow
 */
'use strict';

/* eslint comma-dangle: [1, always-multiline], prefer-object-spread/prefer-object-spread: 0 */
/* eslint-disable no-console */

const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

const PKG_PATH = path.join(__dirname, '..', 'pkg');

fs.readdirSync(PKG_PATH).forEach(pkgName => {
  const pkgPath = path.join(PKG_PATH, pkgName);
  try {
    child_process.execFileSync('apm', ['test'], {
      cwd: pkgPath,
      stdio: 'inherit',
    });
  } catch (e) {
    // apm's stdout/stderr should have this covered.
    process.exit(1);
  }
});
