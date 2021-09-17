Some FYI/ notes for myself:

1. you have to go into the ts config .json file and add "resolveJsonModule": true" under "compilerOptions"

2. importing auth_config.json wasn't working. Got the error 

'Error: Should not import the named export 'domain' (imported as 'domain') from default-exporting module (only default export is available soon)'

Got a similar error for 'clientId', so I just copy-pasted the string values. Should work fine.

3. 