import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { DIFFICULTY_TEXT } from '@app-shared/consts';

type Param = {
  name: string;
  type: string;
};

const DIFFICULTIES = Object.keys(DIFFICULTY_TEXT);
const EXERCISE_DIR = path.join(
  __dirname,
  '..',
  '..',
  'src',
  'content',
  'exercises',
);

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

main(DIFFICULTIES, EXERCISE_DIR);

async function main(
  difficulties: string[],
  exerciseDirPath: string,
): Promise<void> {
  console.log('========================================');
  console.log('🔨 Exercise Generator');
  console.log('========================================');

  const name = await ask('Enter exercise name (keep it short): ');

  if (fs.existsSync(path.join(exerciseDirPath, name))) {
    console.log('❌ Exercise already exists, choose another name, exiting...');
    process.exit(0);
  }

  let difficulty = await ask(
    `Enter exercise difficulty (${difficulties.join(', ')}): `,
  );

  if (!difficulties.includes(difficulty)) {
    console.log('❌ Invalid difficulty, exiting...');
    process.exit(0);
  }

  let functionName = await ask(
    'Enter function name (leave blank for auto generated from name): ',
  );

  if (!functionName) {
    functionName = name
      .replace(/[^a-zA-Z0-9 ]/g, ' ')
      .trim()
      .split(/\s+/)
      .map((w, i) =>
        i === 0
          ? w.toLowerCase()
          : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
      )
      .join('');
  }

  console.log('Params example: nums:number, target:number');
  const paramsRaw = await ask('Params (comma separated, name:type): ');
  const params: Param[] = paramsRaw
    .split(',')
    .map((p) => {
      const [name, type] = p.split(':').map((s) => s.trim());
      return { name, type };
    })
    .filter((p) => p.name && p.type);
  const jsdocParams = params
    .map((p) => ` * @param {${p.type}} ${p.name}`)
    .join('\n');
  const starterContent = `/**
${jsdocParams}
 * @return UPDATE_ME
 */
function ${functionName}(${params.map((p) => p.name).join(', ')}) {

}`;
  const testCases = [
    {
      input: params.map((p) => ({ name: p.name, value: [] })),
      expected: [],
    },
  ];
  const testCasesContent = JSON.stringify(testCases, null, 2);
  const descriptionContent = `---
title: '${name}'
description: ''
difficulty: '${difficulty}'
tags: []
keywords: ''
---
`;
  const folderPath = path.join(exerciseDirPath, name);
  fs.mkdirSync(folderPath, { recursive: true });
  fs.writeFileSync(path.join(folderPath, 'description.md'), descriptionContent);
  fs.writeFileSync(path.join(folderPath, 'starter.js'), starterContent);
  fs.writeFileSync(path.join(folderPath, 'test-cases.json'), testCasesContent);
  console.log(`✅ Exercise created at: ${folderPath}`);
}
