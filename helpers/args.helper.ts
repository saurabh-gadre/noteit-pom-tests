export function getFromArgs(args: any, argName: string, defaultValue?: any): string {
    for (let i = 0; i < args.length; i++) {
        let keyValueString = args[i].replace("-", "");
        let keyValuePair = keyValueString.split("=", 2);

        const KEY_INDEX = 0;
        const VAL_INDEX = 1;
        console.log(keyValuePair[KEY_INDEX], keyValuePair[VAL_INDEX]);
        if (keyValuePair[KEY_INDEX] === argName)
            return keyValuePair[VAL_INDEX];
    }
    return defaultValue;
}
