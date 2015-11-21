enum Color { White, Black }
enum State { NotProcessed, PrepareToDelete, Deleted, Processed }
enum Directions { L, R, T, B }

interface ILrtbWalker {
    go(): void;
    dimension: Directions;
}