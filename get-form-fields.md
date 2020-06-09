### How to use `getFormFields`

To be able to send data to an API, we'll need a way to retrieve that data from
forms in the DOM. It turns out that needing to grab some user
input and send it to the API is a very common problem in front-end web
development.

To help solve that problem, we've included a function called `getFormFields` in
this template. Let's take a look at how to use that function. In this example,
the user is inputting information about a game.

First, your `<input>`s will need to be wrapped in a `<form>`, like this:

```html
<form id="create-user">
  <input name="credentials[email]" type="text" value="an@example.email">
  <input name="credentials[password]" type="password" value="an example password">
  <input name="credentials[password_confirmation]" type="password" value="an example password">
  <button type="submit">Create User</button>
</form>
```
Then, in your Javascript, you'd do something like this:

```js
const getFormFields = require('../../../lib/get-form-fields')

$('#create-user').on('submit', function (event) {
  event.preventDefault()

  const form = event.target
  const userData = getFormFields(form)
})
```

Then, the `userData` variable would look like this:

```js
{
  user: {
    name: "<whatever was entered in the name input >",
    password: "<whatever was entered in the password input>"
  }
}
```

Note that in your projects, the code above will be spread out over several
files.
