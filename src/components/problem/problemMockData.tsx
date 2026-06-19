export interface ProblemItem {
  id: number;
  name: string;
  tags: string[];
  group: string;
  difficulty: string;
}

export const mockProblemList: ProblemItem[] = [
  {
    id: 1,
    name: '#1. Two Sum',
    tags: ['Array', 'Math'],
    group: 'KTLT',
    difficulty: 'Hard',
  },
  {
    id: 2,
    name: '#2. Reverse String',
    tags: ['String'],
    group: 'DSA',
    difficulty: 'Easy',
  },
  {
    id: 3,
    name: '#3. Binary Search',
    tags: ['Array', 'Math'],
    group: 'KTLT',
    difficulty: 'Easy',
  },
  {
    id: 4,
    name: '#4. Max Subarray',
    tags: ['Array'],
    group: 'KTLT',
    difficulty: 'Medium',
  },
  {
    id: 5,
    name: '#5. Course Schedule',
    tags: ['Graph', 'Math'],
    group: 'DSA',
    difficulty: 'Medium',
  },
  {
    id: 6,
    name: '#6. Coin change',
    tags: ['DP'],
    group: 'DSA',
    difficulty: 'Hard',
  },
  {
    id: 7,
    name: '#7. Valid Parentheses',
    tags: ['Stack'],
    group: 'KTLT',
    difficulty: 'Easy',
  },
  {
    id: 8,
    name: '#8. Merge Intervals',
    tags: ['Array'],
    group: 'DSA',
    difficulty: 'Medium',
  },
  {
    id: 9,
    name: '#9. LRU Cache',
    tags: ['Linked List', 'Hash'],
    group: 'DSA',
    difficulty: 'Hard',
  },
  {
    id: 10,
    name: '#10. Climbing Stairs',
    tags: ['DP', 'Math'],
    group: 'KTLT',
    difficulty: 'Easy',
  },
];
