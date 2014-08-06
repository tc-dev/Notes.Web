# Notes.Web

Sample notes App. (Think Evernote, but less)

* ASP.Net Backend. 
* Angular disconnected

## Installing

This will install all `node_modules` and `bower_components` needed

`
npm install
`

## Building

This will run the concatenation build script and inline all html templates
into the template cache.

`
gulp
`

# App Notes

## General Architecture

* Always have a controller per state
* Define state controller in state definition
* Pretty much follow this: [Style Guide by John Papa](https://github.com/johnpapa/angularjs-styleguide)
* Follow these [Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit)
* If you decide on a standard, make a note of it here...

## State Structure

* notes (abstract, layout)
    * notes.auth
        * notes.auth.login
        * notes.auth.register
    * notes.home (shows all notebooks)
    * notes.notebook (notebook selected, show notes)
    * notes.notebook.note (single note selected)

## State Notes

* I thought about having a `notes.notebook.new` and `notes.notebook.note.new`
  state, but i don't feel that _new_ states should be able to live in the URL
  history. I don't think a user should be able to "back-button" their way back
  to this actionable _new_ state

## Services

* notebookService
    * list
    * getById
    * saveNotebook
    * shareNotebook
    * deleteNotebook
    * listNotes
    * getNoteById
    * saveNote
    * shareNote
    * deleteNote
* authService
    * login
    * register
    * forgotPassword
* userService
    * searchByUsername
    
## Directive Ideas

* Notebook
    * I don't know about this just yet
    * Not sure this will provide value as the
      user will most likely select a notebook
    * The best use case is if we are repeating notebooks
      on a page with notes inside. Ex: show all
    * Unless we allow a notebook to list all notes, and
      then put a single __note__ in the __book__ into __edit__ mode
* Note
    * Most probable use case
    
### Directive Scratch Pad

```
<notebook>
    <note></note>
    <note></note>
    <note></note>
</notebook>
```