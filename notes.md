Type system consists of two relations:
- isTypeOf
  - 'constructs' in OO parlance
  - a constructs b, b constructs c implies a constructs c
  - A constructor isTypeOf its instance
  - A function returning x isTypeOf x
    - f: PS -> X isTypeOf f(ps) ∀ ps s.t. PS constructs ps
    - The type system does not differentiate between functions and constructors. Reasons:
      - Technical: JS makes them indistinguishable
      - Curiosity: it seems neat, lets see where it will go
- substitutes
  - 'subtypes' in OO parlance
  - Embodies Liskov substitution
  - a substitutes b, b substitutes c implies a substitutes c
  - x substitutes x ∀ x
  - x substitutes y if a function returning y can be safely replaced by a function returning x.
    - x substitutes y iff PS -> X substitutes PS -> Y
      - This is a tautology when combined with the rules below, but I find this is the easiest way to think of it
These can be seen as two different types of directed edges in the graph of all types and objects.
Since this graph is composed of both types and objects, it opens the door to the use of dependent types.

Some special types can be constructed using these relationships:
- Any
  - Is the type of everything
    - Any isTypeOf X ∀ X
      - Any isTypeOf Any
  - substitutes nothing
    - NOT Any substitutes X ∀ X
  - Is not substituted by anything
    - NOT X substitutes Any ∀ X
- Type
  - isTypeOf all other types (i.e. anything that isTypeOf something else, including all Functions) including itself
    - Type isTypeOf X ∀ X where ∃ x s.t. X isTypeOf x
      - This logic may be impossible to encode, we might have to find workarounds
  - Any isTypeOf Type
  - Type substitutes Any
- X -> Y (function type)
  - X -> Y isTypeOf f: X -> Y
    - TODO can we add co/contravariance here?
  - Type isTypeOf X -> Y
  - Function substitutes Any
  - PS' -> T substitutes PS -> T' iff T substitutes T', PS substitutes PS'
    - co/contravariance
- f: X -> Y (function instance)
  - X -> Y isTypeOf f: X -> Y
    - clarification of notation
  - isTypeOf everything that it returns
    - f: X -> Y isTypeOf y ∀ y s.t. Y isTypeOf y
    - This is a hack which means that constructors can be treated as functions
  - Type isTypeOf f: X -> Y
  - f: PS' -> T substitutes f': PS -> T' iff T substitutes T', PS substitutes PS'
    - co/contravariance
    - TODO not sure if this is correct


Research topics
- This logic is very self-referential. Can we simplify it?
- Can this system allow existential types, are existential types needed given the abundance of co/contravariance?
- Can we treat function parameters as an array or tuple instead of giving them special treatment?
- Should x constructs x ∀ x? (opens the door for some interesting )
  - If we implement this we need to implement a comparison function with cycle detection
  - Should we allow types to be buried inside the instance? e.g. [x, Y] isTypeOf [x, y] ∀ y s.t. Y isTypeOf y
- Need to add some logic for prototypes and object members (e.g. class methods)
