/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {
  RemoteObjectId,
} from '../../../nuclide-debugger-base/lib/protocol-types';

/**
 * Responsible for sending and receiving runtime domain protocols from
 * debug engine.
 */
class RuntimeDomainDispatcher {
  _agent: Object; // runtime agent from chrome protocol.

  constructor(agent: Object) {
    this._agent = agent;
  }

  getProperties(objectId: RemoteObjectId, callback: Function): void {
    this._agent.getProperties(
      objectId,
      false, // ownProperties
      false, // accessorPropertiesOnly
      false, // generatePreview
      callback,
    );
  }
}

// Use old school export to allow legacy code to import it.
module.exports = RuntimeDomainDispatcher;
