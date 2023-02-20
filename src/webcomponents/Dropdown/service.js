export class CdService{
    list(){
        const movies=JSON.parse(fs.readFileSync('src/webcomponents/Dropdown/service.json','utf8'));
        return [movies];
    }

}
