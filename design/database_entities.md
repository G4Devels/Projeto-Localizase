# Firebase Firestore

### Dados principais

```
{
    "locations" : Array<LocalData>
    "users": Object<User>
}
```

### `LocalData`

```
{
    "name" : String,
    "locations" : String,
    "tags" : Array<String>,
    "about" : String,
    "rating" : Object<UserRate>
}
```

### `UserRate`

```
UID (Firebase Authentication) : {
    Note : Int
}
```

## `User`

```
UID (Firebase Authentication) : {
    tags: Array<String>
}
```

## 

# Firebase Authentication

Ainda em desenvolvimento...
