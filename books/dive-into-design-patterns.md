# Dive Into Design Patterns

* **Book**: [Dive Into Design Patterns](https://refactoring.guru/design-patterns/book) (v2021-2.34)
* **Author**: Dmitry Zhart
* **Date read**: 02-01-2023

## Software Design Principles

* *Encapsulate what varies*: move things that are likely to change over time to separate functions/classes
* *Program to an interface, not an implementation*
  * Adding an interface between two parts makes the code more flexible, but at the same time more complex
* *Favor composition over inheritance*
  * Subclass can't reduce the interface of the superclass
  * Subclasses' methods need to be compatible with superclass's methods
  * Inheritance breaks the encapsulation of the superclass
  * Subclasses are tightly coupled to the superclass
* SOLID principles
  * *Single Responsibility Principle*: class should do just one thing and encapsulate the entire implementation
  * *Open/Closed Principle*: class should be open for extension but closed for modification
  * *Liskov Substitution Principle*: subclasses can be used in place of the superclass, i.e. should be compatible
  * *Interface Segregation Principle*: instead of having subclasses that are required to implement all the methods of the superclass, replace the superclass with multiple logical interfaces and have classes that implement one or more of them
  * *Dependency Inversion Principle*: High-level classes should depend on abstractions instead of low-level classes. Details should depend on abstractractions, not vice versa.

## Catalog of Design Patterns

### Creational Design Patterns

#### Factory Method

* Aka *Virtual Constructor*
* Provides an interface for creating objects in superclass, while allowing subclasses to alter the type of created objects
* Problem: direct constructor calls in the business logic code ("*client code*") makes augmenting the code difficult
* Solution: encapsulate the constructor calls into a "*factory method*" of a superclass ("*creator class*") that returns objects ("*products*") adhering to an interface, so adding more subclasses requires less changes to the client code
  * Factory method of the superclass can be abstract or return some default product type
  * In addition to returning new instances, factory method can return existing ones from cache, object pool etc.
  * Creator class commonly also contains business logic that relies on product objects
* Applicability:
  * When you don't know beforehand the exact types and dependencies of the objects your code should work with
  * When you want to make your library extendable
  * When you want to reuse existing objects instead of always creating new ones
* Pros and cons:
  * Supports loose coupling and S & O of SOLID
  * The code becomes more complex, causing unnecessary overhead for projects that remain very simple

#### Abstract Factory Method

* Allows producing families of related objects without specifying their concrete classes
* Problem: having a separate concrete class for each variant becomes unmanageable when number of variants increases
  * E.g. family of furnitures (chair, sofa, coffee table...) that have different variants (modern, victorian, art deco...)
* Solution:
  * Declare interfaces for each product in the family (e.g. chair)
  * Declare abstract factory - an interface with *abstract* creation methods for *each* product in the family (e.g. createChair) that return abstract products represented by an interface (e.g. chair)
  * Create concrete subclass (e.g. ModernFurnitureFactory) of the abstract factory for *each* variant (e.g. Modern), with methods for returning each concrete product (e.g. createChair which returns ModernChair)
  * Client code should use the interface of the abstract factory and abstract products, so you can control the actual product that will be created by passing a concrete factory class as a parameter
  * The concrete factory class is usually created on initialisation stage based on configuration   
* Applicability:
  * When using separate factories for each product could lead to mixing of incompatible products 
* Pros and cons:
  * Same as regular factory, but also...
  * Ensures products reveiced from a factory are compatible (=same variant)

#### Builder

* Constructs complex objects by mixing and matching different "modules"
* Problem: for complex object, using inheritance would lead to a unruly number of subclasses, while a constructor of a god class would include numerous parameters, of which many would be handled by default values usually anyway
  * E.g. a most house objects have walls, doors and windows, but only a few have a pool, garden etc.
* Solution:
  * Declare "*Builder*" that handles different "*Build steps*" (buildWalls, buildDoors etc.) as well as method for returning the product (e.g. getResult)
  * When building an object, only call the *Build Steps* that are relevant to your needs (e.g. don't call buildPool if you don't want one)
  * Declare multiple builders for different use cases (CabinBuilder, CastleBuiler), implementing the same builder interface
    * While builders share an interface, the returned products don't need to.
  * A "*Director*" can be used to call a set *Build Steps* in specific order to avoid code duplication and to hide the building process from the client code
* Applicability:
  * When you don't want to use a "telescopic constructor" with many overloads/default parameters
  * When you have different products (e.g. wooden house, stone house) that is constrcuted using similar steps that differ in details
  * When you build recursive structures like object trees
* Pros and cons:
  * Allows constructing products step by step and reusing the code between different product representations
  * No need to construct the whole object at once: the different steps can be executed at different times
  * Supports S of SOLID
  * The code becomes more complex, causing unnecessary overhead for projects that remain very simple

#### Prototype

* Clone existing objects without making the client dependant on their classes
* Problem:
  * Copying object isn't always possible due to private fields
  * Client code shouldn't need to know its class (loose coupling)
* Solution:
  * Define interface that all supported classes must implement (basically a clone method)
  * Object that supports cloning is called a "*Prototype*"
  * "*Prototype registry*", e.g. a hashmap, can be used to keep track of objects available for cloning
* Applicability:
  * When client code shouldn't depend on concrete classes of the objects that are copied
  * When initialization is a costly operation, and cloning can bypass this
* Pros and cons:
  * May have better performance than initilizing a new, complex object
  * May reduce repetitive initialization code
  * Loose coupling
  * Cloning objects with circular references may be tricky

#### Singleton

* Ensure class has only one instance, and provide global access to it
* Problem:
  * Having multiple instances of a class may be undesirable (e.g. database access)
  * Having the implementation that's needed in multiple places scattered all over the codebase
* Solution:
  * Make the default constructor private
  * Add static creation method that caches the instance in a static field
  * In threaded environment use locks to avoid calling the creation method from multiple threads simultaneously
* Applicability
  * When you're absolutely positive you ever only need one
  * When you need strict control over global variables
* Pros and cons
  * Violates S of Solid by solving two problems
  * Can mask bad design when the components get tightly coupled
  * Mocking a singleton while testing can be difficult since private constructor can't be overwritten in most languages

### Structural Design Patterns

#### Adapter

* Aka *Wrapper*
* Allows objects with incompatible interfaces to collaborate
* Problem: libraries may be incompatible, e.g. use XML and JSON
* Solution:
  * Create an adapter that implements the interface of client class, and converts the calls so they can be understood by the "*Service Class*", which the adapter stores as a reference
  * The adapter may be able to convert the interface calls in both directions
  * *Class Adapter* inherits both classes, overriding the methods
* Applicability: when the interface of an existing class isn't compatible with rest of the code
* Pros and cons: implements S & O of SOLID

#### Bridge

* Splits large class or set of classes into separate hierarchies that can be developed independently
* Problem:
  * Extending a class in two dimensions requires a separate subclass for each permutation
  * E.g. objects with "shapes" and "colors" has two permutations with two shapes and two colors.
* Solution:
  * Use object composition instead of inheritance, e.g. use "shape contains color" relation so adding new shapes or colors don't require changes in the code of the other
* Applicability:
  * When you want to divide a monolithic class with several variant so they can be developed independently
  * When you want to extend a class in several independent dimensions
  * When you need to switch implementations at runtime
* Pros and cons: implements S & O of SOLID

#### Composite

* Aka *Object Tree*
* Compose objects into tree structure and use it as if it's an individual object
* Problem: working with objects containing other objects can be difficult
* Solution:
  * Form a tree structure and use recursive methods defined by common interface
  * "*Component interface*" defines methods that are common to all objects in the tree
  * "*Containers*" aka "*Composites*" delegate method calls to their children and returns a combination from their results
  * "*Leafs*" don't have children and thus end up doing the most of the real work
  * Client code can call methods defined by the component interface whether it's handling a container or a leaf
* Applicability: when you have a tree like object structure
* Pros and cons:
  * Makes it easier to work with tree structures
  * Implements O of SOLID

#### Decorator

* Aka *Wrapper*
* Wrap objects with another object that contains new behaviours
* Problem: IDK, it doesn't do what you want it to do, I guess?
* Solution:
  * Wrap the object with another one that implements the same interface
  * The wrapper can change the input that it relays to original object's method, as well as the output it receives from it
* Applicability:
  * When you want to change objects behaviour during runtime
  * When using inheritance is awkward or impossible
* Pros and cons:
  * Allows extending behaviour without making new subclasses
  * Behaviour can be adjusted on runtime
  * Multiple decorators can be used as layers
  * Implements S of SOLID
  * Unwrapping objects is difficult

#### Facade

* Provide simplified interface to a library, framework, or set of classes
* Problem: using complex 3rd party code directly from your business logic tightly couples them, making your code hard to comprehend and maintain
* Solution: provide simpler interface with usually limited set of functionalities
* Applicapility: when you work with sophisticated library with ton of features, but you need only fraction of them
* Pros and cons:
  * Allows isolating your code from the complexity of subsystems
  * Can become a god object

#### Flyweight

* Aka *Cache*
* Memory optimization by sharing common parts of the state between multiple objects
* Problem: initiating a ton of complex objects consumes a ton of memory
* Solution:
  * Extract constant parts of the object to a separate object and reference it from the object that contains the parts that can be altered
  * "*Intrinsic state*": the constant data that can be read but not altered by other objects
    * "*Flyweight*": the immutable object that stores the intrinsic state
    * Create flyweights in a cached factory, ensuring there exists only one of each type
  * "*Extrinsic state*": the data that can be altered by other objects
    * Contextual object contains extrinsic state and a reference to intrinsic state
* Applicability: when memory consumption becomes a problem due to repetition by multiple objects
* Pros and cons:
  * May save a ton of memory if the use case is suitable
  * Trades memory usage to CPU usage

#### Proxy

* Substitute object with a proxy that controls access to original object and can perform actions when it's accessed
* Problem: initializing some resources can be costly, but we can't always know for sure if they're actually needed
* Solution: create an object that provides the same interface, but e.g:
  * Initiates the resource only when it's actually needed
  * Caches results to avoid unnecessary initiations
* Applicability:
  * "*Virtual proxy*": lazy initialization of a heavyweight resource
  * "*Protection proxy*": when you want to control who (e.g. which processes) can access resource
  * "*Remote proxy*": hide access to resources on remote servers, handling networking details
  * "*Logging proxy*": log requests before passing them to original resource
  * "*Caching proxy*": cache the request-result pairs to save resources
  * "*Smart reference*": dismiss the heavyweight resource when it's not in active use
* Pros and cons:
  * Allows controlling service objects without clients knowing about it

### Behavioral Design Patterns

#### Chain of Responsibility

* Each handler on a chain either processes the received request or passes it to the next handler
* Problem: adding new functionality to a flow might become bloated and hard to maintain
* Solution: encapsulate each step to separate objects ("*handlers*")
  * Create a chain, where every handler knows what the next handler is
  * Each handler
    * Receives the request as a parameter
    * Process the request, if it fulfills required conditions
    * Decide whether to pass the request along or end processing prematurely
  * Alternative approach: only one handler processes the request, and if it does, it doesn't pass it along
* Applicability:
  * When the program needs to process unknown sequence of different kinds of requests in various ways 
  * When the order of handlers is significant
  * When the order of handlers might change at runtime
* Pros and cons:
  * Order of the request handling can be controlled
  * Handlers can be decoupled from the calling code
  * New handlers can be added without affecting the existing ones

#### Command

* Aka *Action* aka *Transaction*
* Turn requests into standalone objects, allowing them to be passed as parameters, delay/queue execution and support undoable operations
* Problem: having UI access business logic directly creates tight coupling
* Solution:
  * Create a command class that encapsulates all the information required to execute an action
  * UI creates and triggers command objects without knowing how they execute the action
    * UI accesses commands via interface without caring what the command actually does
  * Command calls relevant business logic when executing the action and possibly returns a value to caller
* Applicability:
  * When you want to parametrize objects with operations
  * When you want to queue or schedule operations (serialized command objects can be stored in database)
  * When you want to support undo (create an history as a stack of operations that store the prior application state)
* Pros and cons:
  * Implements S & O of SOLID
  * The code becomes more complex, causing unnecessary overhead for projects that remain very simple

#### Iterator

* Allow traversing a collection of elements without exposing the internal implementation
* Problem:
  * Primary responsibility of a collection is to store the data, not provide multiple ways for traversing the data
  * Client code often just wants to access the data, without caring how it's stored
* Solution: extract the traversal algorithm behaviour of a collection into a separate *iterator* object
  * Also encapsulates other details such as the current position and number of remaining objects
  * All iterators must implement the same interface to allow easy consumption by clients
* Pros and cons:
  * Implements S & O of SOLID
  * Allows iterating over a collection in paraller as well as pausing and continue the iteration later

#### Mediator

* Aka *Controller* aka *Intermediary*
* Restrict chaotic communication between multiple objects, forcing all communication to go through the mediator
* Problem: communication between multiple objects may be hard to follow and make them tightly coupled
* Solution: allow all other objects to communicate only with the mediator
* Applicability: when it's hard to change or reuse components due to them being tightly coupled with other components
* Pros and cons:
  * Implements S & O of SOLID
  * Reduce couplings between components
  * Mediator may become a god object

#### Memento

* Aka *Snapshot*
* Allow saving and restoring state of an object without revealing its implementation details
* Problem:
  * Accessing private fields to save a state is impossible
  * Making fields public reveals implementation details
* Solution: delegate creating the state to owner of the state, the *originator* object, and allow other objects to access the state via originator
* Applicability:
  * When implementing an undo functionality
  * When allowing access to fields/getters/setters violates encapsulation

#### Observer

* Aka *Event-Subscriber* aka *Listener*
* Provide subscription mechanism to notify multiple objects about event targeting the observed object
* Problem:
  * Polling object on intervals is wasteful when events occur infrequently
  * Broadcasting events to everyone is wasteful when only a small subset is interested
* Solution:
  * Have the *subject*/*publisher* notify *subscribers* about events, allowing them to subscribe/unsubscrive at will
  * Subscription management and notifications require shared interfaces
* Applicability: when changes in objects may affect a dynamic set of other objects
* Pros and cons:
  * Implements O of SOLID
  * Order in which subscribers are notified isn't usually guaranteed

#### State

* Allow object to change it's behaviour (as if it was a different object) when its state changes
* Problem: having an object implement a finite state machine with defined states and transitions as a if-then structure gets quickly bloated as the number of states increases
* Solution: implement separate classes for each state, encapsulating all state-specific code
  * *Context* object stores a reference to current state object and delegates state-related work to that object
  * States may be aware of each other and initiate transitions to other states
* Applicability:
  * When the state affects the behaviour and number of states is high
  * When composing hierarchies of state classes reduces duplication
* Pros and cons: implements S & O of SOLID

#### Strategy

* Create interchangeable classes for a family of algorithms
* Problem: having a god class for different ways to achieve the same thing can easily become unmanageable
* Solution: implement *strategies*, i.e. classes that each contain an algorithm for doing something specific in a different way
  * *Context* object stores a reference to a strategy and delegates work to that object
  * Strategies are unaware of each other
* Applicability: when isolating specific algortihm implementation from the business logic makes sense 
* Pros and cons:
  * Implements O of SOLID
  * Overhead

#### Template Method

* Define skeleton of an algorithm in a superclass, letting the sublasses override only specific steps
* Problem: e.g. extracting data from different file formats and processing can lead to situation where every format has a separate handler (duplication), or all share a handler (if-else hell)
* Solution: break the problem into series of steps, and let each handler only override specific steps while keeping the main structure unchanging and reusable
  * Use abstract steps, optional steps with default implementation and hooks to act before/after steps locked in main structure
* Pros and cons:
  * Allows 3rd party to override parts while encapsulating others
  * Might violate L of SOLID is subclass suppresses deafult step implementation

#### Visitor

* Separate algorithms from the objects on which they operate
* Problem: adding functionality as an afterthought may break the code already in production
* Solution: place the new functionality to a *visitor* class
  * By *double dispatch*, make the original object *accept* (= receive as a parameter) the visitor and choose the method of the visitor that works with the type of the object
    * Does require some changes to the original object though
* Applicability: when the visitor can clean up the business logic of auxiliary behaviours
* Pros and cons:
  * Implements S & O of SOLID
  * Honestly seems a bit silly since the visitor and original objects are is still tightly coupled
 