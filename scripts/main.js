var clients = []
var projects = []

function dbCreate(db) {
    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE users (code TEXT,ident TEXT,passwd TEXT);")
        tx.executeSql("CREATE TABLE clients (code TEXT,user TEXT,civilite TEXT,nom TEXT,prenom TEXT,adresse TEXT,postal TEXT,phone TEXT,mail TEXT);")
        tx.executeSql("CREATE TABLE projects (code TEXT,client TEXT,statut TEXT,nom TEXT,adresse TEXT);")
        //
        testpopulate(tx)
    })
    db.changeVersion("","1.0")
}

function testpopulate(tx) {
    // USERS ###########################
    tx.executeSql("INSERT INTO users VALUES(?,?,?);",['123','killian','error404'])
    tx.executeSql("INSERT INTO users VALUES(?,?,?);",['456','richard','testrichard'])
    tx.executeSql("INSERT INTO users VALUES(?,?,?);",['789','alain','testalain'])
    // CLIENTS #########################
    var clt = ['123-444','123','monsieur','Dupond','Pierre','14, rue de la jolie LANDERNEAU','29800','0699331122','pas d\'email']
    tx.executeSql("INSERT INTO clients VALUES(?,?,?,?,?,?,?,?,?);",clt)
    clt = ['456-545','456','madame','L\'îrchant','Laurette','21, avenue bon pain BREST','29200','0298121212',"mamielaurette92@hotmail.fr"]
    tx.executeSql("INSERT INTO clients VALUES(?,?,?,?,?,?,?,?,?);",clt)
    clt = ['123-358','123','famille','Soma','','4bis, ruelle perdue LESNEVEN','29260','0298054556','famille.soma@gmail.com']
    tx.executeSql("INSERT INTO clients VALUES(?,?,?,?,?,?,?,?,?);",clt)
    // PROJETS #########################
    var prjt = ['123-444,435','123-444','Brouillon','Villa bretagne','Place Sanquer 29XXX PLOUDALMEZEAU']
    tx.executeSql("INSERT INTO projects VALUES(?,?,?,?,?);",prjt)
    prjt = ['123-444-568','123-444','Envoyé','Villa bretagne 2','Place Henri VIII 29XXX GUISSENY']
    tx.executeSql("INSERT INTO projects VALUES(?,?,?,?,?);",prjt)
    prjt = ['123-358,411','123-358','Validé','Maison de campagne','34, allée de l\'azalée 20290 GUIPAVAS']
    tx.executeSql("INSERT INTO projects VALUES(?,?,?,?,?);",prjt)
    // GAMMES ##########################
    // DEVIS ###########################
    //
}

function tryConnection() {
    welcomeView.identcol = "black"
    welcomeView.passwdcol = "black"
    if (welcomeView.identval === "") welcomeView.identcol = "red"
    else if (welcomeView.passwdval === "") welcomeView.passwdcol = "red"
    else {
        rackdb.transaction(function(tx) {
            var req = "WHERE ident='"+welcomeView.identval+"' AND ";
            req += "passwd='"+welcomeView.passwdval+"';";
            var rs = tx.executeSql("SELECT COUNT(*) AS found,code FROM users "+req)
            var ct = parseInt(rs.rows.item(0).found)
            if (ct === 0) {
                welcomeView.identcol = "red"
                welcomeView.passwdcol = "red"
            }
            else {
                root.usercode = rs.rows.item(0).code
                initClientView()
                mainStack.push(clientView)
            }
        })
    }
}

function initClientView() {
    root.connect = false
    root.connbtn = false
    welcomeView.identval = ""
    welcomeView.passwdval = ""
    clientView.nameLab.color = "black"
    clientView.nameEdit.text = ""
    clientView.nicknameLab.color = "black"
    clientView.nicknameEdit.text = ""
    clientView.adressLab.color = "black"
    clientView.adressEdit.text = ""
    clientView.postalLab.color = "black"
    clientView.postalEdit.text = ""
    clientView.phoneLab.color = "black"
    clientView.phoneEdit.text = ""
    clientView.emailLab.color = "black"
    clientView.emailEdit.text = ""
    clientView.lstmodel.clear()
    clients = []
    rackdb.transaction(function(tx) {
        var rs = tx.executeSql("SELECT code,civilite,nom,prenom,adresse,postal FROM clients ORDER BY nom,prenom;")
        for (var i=0;i<rs.rows.length;i++) {
            var txt = rs.rows.item(i).civilite.charAt(0).toUpperCase()
            txt += rs.rows.item(i).civilite.substring(1)+" "
            txt += rs.rows.item(i).nom.toUpperCase()
            if (rs.rows.item(i).civilite != "famille") {
                txt += ", "+rs.rows.item(i).prenom.charAt(0).toUpperCase()
                txt += rs.rows.item(i).prenom.substring(1)
            }
            var rep = {
                code: rs.rows.item(i).code, nom: rs.rows.item(i).nom,
                prenom: rs.rows.item(i).prenom, value: txt,
                adresse: rs.rows.item(i).adresse, postal: rs.rows.item(i).postal
            }
            clients.push(rep)
            clientView.lstmodel.append(rep)
        }
    })
}

function createClient() {
    // initialize
    var dte = new Date()
    var code = root.usercode+"-"+dte.getFullYear()
    code += ((dte.getMonth() < 10)? "0" : "")+dte.getMonth()
    code += ((dte.getDay() < 10)? "0" : "")+dte.getDay()
    code += ((dte.getHours() < 10)? "0" : "")+dte.getHours()
    code += ((dte.getMinutes() < 10)? "0" : "")+dte.getMinutes()
    code += ((dte.getSeconds() < 10)? "0" : "")+dte.getSeconds()
    var req = [code,root.usercode]
    // reset the lab color
    clientView.nameLab.color = "black"
    clientView.nicknameLab.color = "black"
    clientView.adressLab.color = "black"
    clientView.postalLab.color = "black"
    clientView.phoneLab.color = "black"
    clientView.emailLab.color = "black"
    // get the civilite
    if (clientView.civiliteBtn1.checked) req.push("monsieur")
    else if (clientView.civiliteBtn2.checked) req.push("madame")
    else if (clientView.civiliteBtn3.checked) req.push("famille")
    // get the nom
    if (clientView.nameEdit.text == "") {
        clientView.nameLab.color = "red"
        return
    }
    else req.push(clientView.nameEdit.text)
    // get the prenom
    if (clientView.civiliteBtn3.checked) {}
    else if (clientView.nicknameEdit.text == "") {
        clientView.nicknameLab.color = "red"
        return
    }
    else req.push(clientView.nicknameEdit.text)
    // get the adress
    if (clientView.adressEdit.text == "") {
        clientView.adressLab.color = "red"
        return
    }
    else req.push(clientView.adressEdit.text)
    // get the postal code
    if (clientView.postalEdit.text == "") {
        clientView.postalLab.color = "red"
        return
    }
    else req.push(clientView.postalEdit.text)
    // get the phone
    if (clientView.phoneEdit.text == "") {
        clientView.phoneLab.color = "red"
        return
    }
    else req.push(clientView.phoneEdit.text)
    // get the email
    if (clientView.emailEdit.text == "") {
        clientView.emailLab.color = "red"
        return
    }
    else req.push(clientView.emailEdit.text)
    // save in db
    rackdb.transaction(function(tx) {
        tx.executeSql("INSERT INTO clients VALUES(?,?,?,?,?,?,?,?,?);",req)
        accessClient(code)
    })
}

function filterClient(nom,prenom) {
    clientView.lstmodel.clear()
    for (var i=0;i<clients.length;i++) {
        if (nom != "") {
            if (clients[i].nom.toLowerCase().indexOf(nom.toLowerCase(),0) == -1) continue
        }
        if (prenom != "") {
            if (clients[i].prenom == null) continue
            else if (clients[i].prenom.toLowerCase().indexOf(prenom.toLowerCase(),0) == -1) continue
        }
        clientView.lstmodel.append(clients[i])
    }
}

function accessClient(code) {
    root.clientcode = code
    initProjectView()
    mainStack.push(projectView)
}

function initProjectView() {
    //
    // TODO : clean the new project form
    // TODO : fill the client infos
    //
    projects = []
    projectView.lstmodel.clear()
    rackdb.transaction(function(tx) {
        // set client infos
        var rs = tx.executeSql("SELECT * FROM clients WHERE code=?;",[root.clientcode])
        var txt = rs.rows.item(0).civilite.charAt(0).toUpperCase()
        txt += rs.rows.item(0).civilite.substring(1)+" "
        txt += rs.rows.item(0).nom.toUpperCase()
        if (rs.rows.item(0).civilite != "famille") {
            txt += ", "+rs.rows.item(0).prenom.charAt(0).toUpperCase()
            txt += rs.rows.item(0).prenom.substring(1)
        }
        projectView.clientLn1.text = txt
        projectView.clientLn2.text = rs.rows.item(0).adresse+" "+rs.rows.item(0).postal
        // set client projects list
        rs = tx.executeSql("SELECT code,statut,nom,adresse FROM projects WHERE client=?;",[root.clientcode])
        for (var i=0;i<rs.rows.length;i++) {
            var rep = {
                code: rs.rows.item(i).code, statut: rs.rows.item(i).statut,
                nom: rs.rows.item(i).nom, adresse: rs.rows.item(i).adresse
            }
            projects.push(rep)
            projectView.lstmodel.append(rep)
        }
    })
}

function filterProject(nom) {
    projectView.lstmodel.clear()
    for (var i=0;i<projects.length;i++) {
        if (nom != "") {
            if (projects[i].nom.toLowerCase().indexOf(nom.toLowerCase(),0) == -1) continue
        }
        projectView.lstmodel.append(projects[i])
    }
}

//

function backStack() {
    mainStack.pop()
    if (mainStack.currentItem == welcomeView) {
        root.connbtn = true
        root.usercode = ""
        clientView.nameSearch.text = ""
        clientView.nicknameSearch.text = ""
        clientView.newClient = false
        clientView.selClient = false
    }
    else if (mainStack.currentItem == clientView) {
        root.clientcode = ""
        clientView.nameSearch.text = ""
        clientView.nicknameSearch.text = ""
        clientView.newClient = false
        clientView.selClient = false
        initClientView()
    }
    else if (mainStack.currentItem == projectView) {
        //
        //
        initProjectView()
    }
    //
}
