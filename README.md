# omise-react-native
==========

Non-official Omise library for react-native

## Install

```sh
$ npm install omise-react-native --save
```

## Setup
To set Omise public key and API version

```
import Omise from 'omise-react-native';
Omise.config('pkey_test_596un7xggnyo73nm7an', '2015-11-17');
```

## Usage

```
const data = await Omise.createToken({
    'card': {
        'name': 'JOHN DOE',
        'city': 'Bangkok',
        'postal_code': 10320,
        'number': '4242424242424242',
        'expiration_month': 10,
        'expiration_year': 2018,
        'security_code': 123
    }
    });

    console.log("data", data);
```