# Firebase Firestore

### Localizase Locations

```
{
    "locations" : Array<LocalData>
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

## Dados do usuário

```
UserData : {
    UID (Authentication): String,
    user_taste: Array<String>,
}
```



# Authentication

Ainda em desenvolvimento...
