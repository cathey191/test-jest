import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
// @ts-expect-error
global.TextDecoder = TextDecoder

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
const collectionPath = path.join(__dirname, '../collection.json');

describe('hello-world', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematic('hello-world', {}, Tree.empty());
    expect(tree.files).toEqual([]);
  });
  it('works', async () => {
    const workspaceOptions = {
      name: 'workspace',
      newProjectRoot: 'projects',
      version: '7.0.0',
    };
    const defaultAppOptions = {
      name: 'bar',
      inlineStyle: false,
      inlineTemplate: false,
      viewEncapsulation: 'Emulated',
      routing: false,
      style: 'css',
      skipTests: false
    };
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const workspaceTree = await runner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );
    const appTree = await runner.runExternalSchematic('@schematics/angular', 'application', defaultAppOptions, workspaceTree);
    const tree = await runner.runSchematic('hello-world', {}, appTree);
    expect(tree.files[0]).toEqual('/README.md');
  });
});
