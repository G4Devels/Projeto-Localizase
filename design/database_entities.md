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
    "localization" : String,
    "local_tastes" : Array<String>,
    "description" : String,
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
    user_taste: Array<String>
}
```

## 

# Firebase Authentication

Ainda em desenvolvimento...
