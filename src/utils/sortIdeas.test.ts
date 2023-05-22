import { ItemType } from '../types';
import { expect, test } from 'vitest';

const sortIdeas = (
  ideas: ItemType[],
  property: keyof ItemType,
  isDescending: boolean
): ItemType[] => {
  return [...ideas].sort((a, b) => {
    if (a[property] < b[property]) return isDescending ? 1 : -1;
    if (a[property] > b[property]) return isDescending ? -1 : 1;

    return 0;
  });
};

const ideaOne: ItemType = {
  id: 'alpha',
  title: 'charlie',
  description: 'echo',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const ideaTwo: ItemType = {
  id: 'bravo',
  title: 'delta',
  description: 'alpha',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const ideaThree: ItemType = {
  id: 'delta',
  title: 'bravo',
  description: 'bravo',
  createdAt: new Date(),
  updatedAt: new Date(),
};

test('sortIdeas - sort by title ascending', () => {
  const sortedIdeas = sortIdeas([ideaOne, ideaTwo, ideaThree], 'title', false);

  expect(sortedIdeas).toStrictEqual([ideaThree, ideaOne, ideaTwo]);
});

test('sortIdeas - sort by description ascending', () => {
  const sortedIdeas = sortIdeas(
    [ideaOne, ideaTwo, ideaThree],
    'description',
    false
  );

  expect(sortedIdeas).toStrictEqual([ideaTwo, ideaThree, ideaOne]);
});

test('sortIdeas - sort by id ascending', () => {
  const sortedIdeas = sortIdeas([ideaThree, ideaOne, ideaTwo], 'id', false);

  expect(sortedIdeas).toStrictEqual([ideaOne, ideaTwo, ideaThree]);
});

test('sortIdeas - sort by title desc', () => {
  const sortedIdeas = sortIdeas([ideaOne, ideaTwo, ideaThree], 'title', true);

  expect(sortedIdeas).toStrictEqual([ideaTwo, ideaOne, ideaThree]);
});
