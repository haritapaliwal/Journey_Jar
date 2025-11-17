# Journey Jar - System Diagrams

## Level 0 DFD (Context Diagram)

```mermaid
flowchart TD
    User([User])
    System[Journey Jar System]
    DB[(Database)]
    
    User -->|Login/Register| System
    User -->|Input Preferences| System
    User -->|View/Save Trips| System
    System -->|Recommendations| User
    System -->|Store/Retrieve Data| DB
    DB -->|User & Trip Data| System
```

## Level 1 DFD (Detailed Process Flow)

```mermaid
flowchart TD
    User([User])
    
    subgraph "Journey Jar System"
        Auth[Authentication Module]
        Pref[Preference Input Module]
        Rec[Recommendation Engine]
        Save[Saved Trips Module]
    end
    
    DB[(MongoDB Database)]
    
    User -->|Credentials| Auth
    Auth -->|Token| User
    Auth <-->|User Data| DB
    
    User -->|Travel Preferences| Pref
    Pref -->|Preferences| Rec
    Rec -->|Destinations| DB
    Rec -->|Recommendations| User
    
    User -->|Save Trip| Save
    Save <-->|Saved Trips| DB
    Save -->|Confirmation| User
```

## Use Case Diagram

```mermaid
graph LR
    User((User))
    
    User --> UC1[Register Account]
    User --> UC2[Login]
    User --> UC3[Input Preferences]
    User --> UC4[View Recommendations]
    User --> UC5[Save Trip]
    User --> UC6[View Saved Trips]
    User --> UC7[Delete Saved Trip]
    
    UC3 -.includes.-> UC2
    UC4 -.includes.-> UC3
    UC5 -.includes.-> UC4
```

## Sequence Diagram - Get Recommendations

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant API
    participant Auth
    participant RecEngine as Recommendation Engine
    participant DB as Database
    
    User->>Frontend: Enter preferences
    Frontend->>API: POST /api/recommendations
    API->>Auth: Verify JWT token
    Auth-->>API: Token valid
    API->>RecEngine: getRecommendations(preferences)
    RecEngine->>DB: Fetch destinations
    DB-->>RecEngine: Destination list
    RecEngine->>RecEngine: Calculate scores
    RecEngine->>RecEngine: Rank & filter top N
    RecEngine-->>API: Recommendations
    API-->>Frontend: JSON response
    Frontend-->>User: Display results
```

## Sequence Diagram - Save Trip

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant API
    participant Auth
    participant Controller
    participant DB as Database
    
    User->>Frontend: Click "Save Trip"
    Frontend->>API: POST /api/saved-trips
    API->>Auth: Verify JWT token
    Auth-->>API: Token valid
    API->>Controller: saveTrip(data)
    Controller->>DB: Check if exists
    DB-->>Controller: Not found
    Controller->>DB: Create SavedTrip
    DB-->>Controller: Trip saved
    Controller-->>API: Success response
    API-->>Frontend: JSON response
    Frontend-->>User: Show confirmation
```

## Class Diagram

```mermaid
classDiagram
    class User {
        +String _id
        +String email
        +String password
        +String name
        +Date createdAt
        +comparePassword()
    }
    
    class Destination {
        +String destinationId
        +String name
        +String summary
        +String itinerary
        +String costLevel
        +String imageUrl
        +Object tags
    }
    
    class SavedTrip {
        +String _id
        +ObjectId userId
        +String destinationId
        +String destinationName
        +Object preferences
        +String summary
        +String itinerary
        +String costLevel
        +String imageUrl
        +Date savedAt
    }
    
    class RecommendationEngine {
        +getRecommendations(preferences, topN)
        -calculateScore(destination, preferences)
    }
    
    User "1" --> "*" SavedTrip : saves
    SavedTrip "*" --> "1" Destination : references
    RecommendationEngine ..> Destination : queries
```

## Architecture Diagram

```mermaid
graph TB
    subgraph "Frontend - React"
        UI[User Interface]
        Pages[Pages/Components]
        API_Client[API Client]
    end
    
    subgraph "Backend - Node.js/Express"
        Routes[Routes]
        Controllers[Controllers]
        Middleware[Middleware]
        RecEngine[Recommendation Engine]
        Models[Mongoose Models]
    end
    
    subgraph "Database"
        MongoDB[(MongoDB)]
    end
    
    UI --> Pages
    Pages --> API_Client
    API_Client -->|HTTP/REST| Routes
    Routes --> Middleware
    Middleware --> Controllers
    Controllers --> RecEngine
    Controllers --> Models
    Models --> MongoDB
```
