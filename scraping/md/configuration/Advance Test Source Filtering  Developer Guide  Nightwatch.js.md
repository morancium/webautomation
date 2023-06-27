The below settings can be used to define ways of filtering test files.

| Name | type | default | description |
| --- | --- | --- | --- |
| `exclude` | array |  | An array of folders or file patterns to be skipped (relative to the main source folder).  
Example:
`"exclude" : ["excluded-folder"]`  
or:  
`"exclude" : ["test-folder/\*-smoke.js"]`

 |
| `filter` | string |  | Folder or file pattern to be used when loading the tests. Files that don't match this pattern will be ignored.  
Example:

`"filter" : "tests/\*-smoke.js"`

 |
| `skipgroup`  
 | string |  | Skip a group of tests (a subfolder); can be a list of comma-separated values (no space). |
| `skiptags`  
 | string |  | Skip tests by tag name; can be a list of comma-separated values (no space). |

### Recommended content

-   [Reference > All configuration settings](https://nightwatchjs.org/guide/reference/settings.html)
-   [Reference > Configuration defaults](https://nightwatchjs.org/guide/reference/defaults.html)