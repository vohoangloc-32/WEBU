export interface ProblemType {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isFavorite: boolean;
}

export const mockProblems: ProblemType[] = [
  {
    id: '1',
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    tags: ['KTLT', 'Array', 'Hash Table'],
    difficulty: 'Easy',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    description:
      'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order.',
    tags: ['DSA', 'Linked List', 'Math'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Remove Element',
    description:
      'Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.',
    tags: ['KTLT', 'Array', 'Two Pointers'],
    difficulty: 'Easy',
    isFavorite: true,
  },
  {
    id: '4',
    title: 'Median of Two Sorted Arrays',
    description:
      'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    tags: ['DSA', 'Array', 'Binary Search'],
    difficulty: 'Hard',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Multiply Strings',
    description:
      'Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2.',
    tags: ['DSA', 'Math', 'String'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '6',
    title: 'Valid Parentheses',
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    tags: ['KTLT', 'String', 'Stack'],
    difficulty: 'Easy',
    isFavorite: true,
  },
  {
    id: '7',
    title: 'Merge Two Sorted Lists',
    description:
      'Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.',
    tags: ['KTLT', 'Linked List'],
    difficulty: 'Easy',
    isFavorite: false,
  },
  {
    id: '8',
    title: '3Sum',
    description:
      'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that they add up to 0.',
    tags: ['DSA', 'Array', 'Two Pointers'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '9',
    title: 'N-Queens II',
    description:
      'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.',
    tags: ['DSA', 'Backtracking'],
    difficulty: 'Hard',
    isFavorite: false,
  },
  {
    id: '10',
    title: 'Minimum Path Sum',
    description:
      'Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum.',
    tags: ['DSA', 'Dynamic Programming', 'Matrix'],
    difficulty: 'Medium',
    isFavorite: true,
  },
  {
    id: '11',
    title: 'Climbing Stairs',
    description:
      'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.',
    tags: ['KTLT', 'Math', 'Dynamic Programming'],
    difficulty: 'Easy',
    isFavorite: false,
  },
  {
    id: '12',
    title: 'Sort List',
    description:
      'Given the head of a linked list, return the list after sorting it in ascending order.',
    tags: ['DSA', 'Linked List', 'Sorting'],
    difficulty: 'Medium',
    isFavorite: true,
  },
  {
    id: '13',
    title: 'Longest Palindromic Substring',
    description:
      'Given a string s, return the longest palindromic substring in s.',
    tags: ['DSA', 'String', 'Dynamic Programming'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '14',
    title: 'Reverse Linked List',
    description:
      'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    tags: ['KTLT', 'Linked List'],
    difficulty: 'Easy',
    isFavorite: true,
  },
  {
    id: '15',
    title: 'Container With Most Water',
    description:
      'Find two lines that together with the x-axis form a container, such that the container contains the most water.',
    tags: ['DSA', 'Array', 'Two Pointers'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '16',
    title: 'Sudoku Solver',
    description:
      'Write a program to solve a Sudoku puzzle by filling the empty cells.',
    tags: ['DSA', 'Hash Table', 'Matrix', 'Backtracking'],
    difficulty: 'Hard',
    isFavorite: true,
  },
  {
    id: '17',
    title: 'First Missing Positive',
    description:
      'Given an unsorted integer array nums, return the smallest missing positive integer.',
    tags: ['DSA', 'Array', 'Hash Table'],
    difficulty: 'Hard',
    isFavorite: true,
  },
  {
    id: '18',
    title: 'Search Insert Position',
    description:
      'Given a sorted array of distinct integers and a target value, return the index if the target is found.',
    tags: ['KTLT', 'Array', 'Binary Search'],
    difficulty: 'Easy',
    isFavorite: false,
  },
  {
    id: '19',
    title: 'Jump Game',
    description:
      "You are given an integer array nums. You are initially positioned at the array's first index.",
    tags: ['DSA', 'Array', 'Greedy'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '20',
    title: 'Merge Intervals',
    description:
      'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
    tags: ['DSA', 'Array', 'Sorting'],
    difficulty: 'Medium',
    isFavorite: true,
  },
  {
    id: '21',
    title: 'Trapping Rain Water',
    description:
      'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap.',
    tags: ['DSA', 'Array', 'Two Pointers'],
    difficulty: 'Hard',
    isFavorite: true,
  },
  {
    id: '22',
    title: 'Maximum Subarray',
    description:
      'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    tags: ['KTLT', 'Array', 'Dynamic Programming'],
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '23',
    title: 'Edit Distance',
    description:
      'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.',
    tags: ['DSA', 'String', 'Dynamic Programming'],
    difficulty: 'Hard',
    isFavorite: false,
  },
  {
    id: '24',
    title: 'Single Number',
    description:
      'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.',
    tags: ['KTLT', 'Array', 'Bit Manipulation'],
    difficulty: 'Easy',
    isFavorite: true,
  },
];
