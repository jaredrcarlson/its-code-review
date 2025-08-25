# Doubly Linked List with Unit Tests
Author: Jared Carlson

## Overview
This Java project implements and thoroughly tests a **doubly linked list** data structure.  
The list supports storage and retrieval of generic elements, using nodes that link in both directions.  
A private inner iterator class enables traversal and modification in either direction.  

The implementation is verified with **22 distinct test scenarios**, ensuring that storage, retrieval, and iterator behavior meet all requirements of the `DoubleLinkedListADT` interface.

## Included Files
- `DoubleLinkedListTester.java` – contains the main test harness and all unit tests  
- `DoubleLinkedList.java` – core data structure implementation, including inner `DoubleLinkedListIterator`  
- `DoubleLinkedLinearNode.java` – node class with element, previous, and next links  
- `DoubleLinkedListADT.java` – interface implemented by `DoubleLinkedList`  
- `UnorderedListADT.java`, `IndexedListADT.java`, `ListADT.java` – supporting interfaces  
- `ElementNotFoundException.java`, `EmptyCollectionException.java` – custom exceptions  

## Building and Running
All files should be in the same directory.

Compile:
```bash
javac DoubleLinkedListTester.java
```

Run tests:
```bash
java DoubleLinkedListTester -d
```

- Argument `-d` runs all **22 unit test scenarios** against the doubly linked list implementation.

## Testing Approach
- Each method of the `DoubleLinkedListADT` interface is tested against expected results.  
- Tests cover both **normal operations** and **edge cases** (empty list, head/tail insertion, invalid positions).  
- New lists are created per test to isolate state changes.  
- Expected vs. actual outputs are compared automatically to confirm correctness.  

This project demonstrates the ability to **design a data structure, implement required interfaces, and verify correctness with automated tests**.

## Design Notes
- Uses **sentinel nodes** for head and tail to simplify boundary operations.  
- Inner class `DoubleLinkedListIterator` provides efficient single-pass traversal for operations like `addAfter`.  
- Implementation ensures encapsulation and correctness of all interface methods.  

## Learning Outcomes
Through this project I strengthened my ability to:
- Interpret and implement data structure interfaces  
- Build and run comprehensive unit tests to validate behavior  
- Identify and fix subtle bugs (e.g., sentinel handling in `hasNext` / `hasPrevious`)  
