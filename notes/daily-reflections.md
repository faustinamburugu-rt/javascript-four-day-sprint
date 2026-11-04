The  137 / 60 performs  a normal division which gives a decimal places instead of providing a whole number of hour and minutes
null it because the function can reject an invalid amount without throwing an exception.
 15 is replaced by the word "fizzBuzz"
The spread operator copies an array or object into a new one, so I can change the copy (for example { ...task, completed: true }) without silently changing the original data. map and filter also return new arrays, so my functions never mutate the original.
this is because Because each function has a different responsibility.
map() = Change every item.



filter() = Keep selected items.



find() = Find one item.



some() = At least one?



every() = All of them?



reduce() = Combine into one result.
this is because Because each function has a different responsibility.
the harsh value #complete makes the class private while the complete() make it true and toggle() make it true or false it switches in between the
Update task	map() + spread	New array and updated object
Delete task	filter()	New array
Rename task	map() + spread	New array and updated object
Complete task	map() + spread	New array and updated object 
TextContent treats everything as plain text, while innerHTML interprets content as HTML code.
SearchTasks returns a filtered copy because searching should find matching tasks without changing your original task list, sampleTasks.
CurrentTasks = it keeps the original data
GetVisibleTasks() = calculates which tasks should appear.
Render() = displays those visible tasks.

Promise.all() is useful for independent requests, but one rejection rejects the combined promise.
Local task features must work without internet.
Validate external data before using it.
Check response.ok before reading the response body as JSON.
