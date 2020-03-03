## Todos
Actions needed to finish version 2.. 
at least for now...

List: 
* Create category before list
* ADD_LIST should have category in payload.
* Categories/addListToCategory will react on ADD_LIST
* lists/updateListCategory will react on ADD_LIST_TO_CATEGORY

* Add events to moderator
* Finalize category picker component
  * Add button or other indication that a new category will be created
  * Fix the form to not send on enter
* Test feature

## When user write a category name
UX steps in categorypicker component

* Check if it matches a category name that exsist.
* "Select" (css) the first matching item in category list
* if user press enter => pick "selected" category
  * if no category is selected => go and create a new category