const HEADERS="[{\"Name\":\"Name\",\"ShortName\":\"\",\"Type\":\"string\",\"Editable\":\"false\",\"Group\":\"\"}," +
"{\"Name\":\"Ccccc\",\"ShortName\":\"C\",\"Type\":\"string\",\"Dropdown\":[\"6\",\"4\"],\"Editable\":\"false\",\"Group\":\"B\"},"+
"{\"Name\":\"Function\",\"ShortName\":\"D\",\"Type\":\"string\",\"Editable\":\"false\",\"Group\":\"B\"}]"

const FIELDS="[{\"Name\":\"Olaf1\",\"Ccccc\":6,\"Function\":12},"+
"{\"Name\":\"Olaf2\",\"Ccccc\":6,\"Function\":12},"+
"{\"Name\":\"Olaf3\",\"Ccccc\":6,\"Function\":12},"+
"{\"Name\":\"Olaf4\",\"Ccccc\":6,\"Function\":12},"+
"{\"Name\":\"Olaf5\",\"Ccccc\":6,\"Function\":12},"+
"{\"Name\":\"Olaf6\",\"Ccccc\":6,\"Function\":12},"+
"{\"Name\":\"Olaf7\",\"Ccccc\":6,\"Function\":12}]";

function getNewValues(row){
    row.Function = row.Ccccc * 2;
    return JSON.stringify(row);
}