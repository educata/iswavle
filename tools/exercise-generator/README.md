# Exercise generator

This generator will generate exercise base folder & files.

Run following command:

```
bun exercise:generate
```

You will be prompted to enter:

- **Exercise name** (keep it short)
- **Difficulty** (choose from the allowed difficulties)
- **Function name** (leave blank to auto-generate from the exercise name)
- **Parameters** (comma separated, `name:type`)

After completing the prompts, the generator will create a new folder with:

- `description.md` – frontmatter for exercise metadata
- `starter.js` – starter function file
- `test-cases.json` – example test cases

The folder will be created inside:

```
src/content/exercises/<exercise-name>
```