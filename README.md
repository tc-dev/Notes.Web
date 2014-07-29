Notes.Web
====

Sample note App. ASP.Net Backend. Angular disconnected

Installing
----

This will install all `node_modules` and `bower_components` needed

`
npm install
`

Building
----

This will run the concatenation build script and inline all html templates
into the template cache.

`
gulp
`

App Notes
====

State Structure
----

* auth (layout)
    * auth.login
    * auth.register
* notes (layout)
    * notes.home
    * notes.notebook.note

State Notes
----

* I thought about having a `notes.notebook.new` and `notes.notebook.note.new`
  state, but i don't feel that _new_ states should be able to live in the URL
  history. I don't think a user should be able to "back-button" their way back
  to this actionable _new_ state