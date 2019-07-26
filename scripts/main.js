var clients = []
var projects = []
var modules = []
var devis_list = {}

// helpers ###################

function clientLabGen(rs) {
    var txt = rs.rows.item(0).civilite.charAt(0).toUpperCase()
    txt += rs.rows.item(0).civilite.substring(1)+" "
    txt += rs.rows.item(0).nom.toUpperCase()
    if (rs.rows.item(0).civilite != "famille") {
        txt += ", "+rs.rows.item(0).prenom.charAt(0).toUpperCase()
        txt += rs.rows.item(0).prenom.substring(1)
    }
    return txt
}

function numberToString(number) {
    var tmp1 = ""+number
    var tmp2 = tmp1.split(".")[0]
    var tmp3 = "", tmp4 = "", counter = 0
    for (var i=tmp2.length-1;i>-1;i--) {
        tmp3 = tmp2[i]+tmp3; counter++
        if (counter == 3) { tmp4 = " "+tmp3+tmp4; tmp3 = "" }
    }
    if (tmp3.length > 0) tmp4 = tmp3+tmp4
    tmp1 = ""+(number*100)
    tmp1 = tmp1.substring(tmp1.length-2)
    return tmp4+"."+tmp1
}

// called functions ##########

function dbCreate(db) {
    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE users (code TEXT,ident TEXT,passwd TEXT);")
        tx.executeSql("CREATE TABLE clients (code TEXT,user TEXT,civilite TEXT,nom TEXT,prenom TEXT,adresse TEXT,ville TEXT,postal TEXT,phone TEXT,mail TEXT);")
        tx.executeSql("CREATE TABLE projects (code TEXT,client TEXT,statut TEXT,nom TEXT,adresse TEXT,postal TEXT,ville TEXT,date TEXT,gamme TEXT,modele TEXT);")
        tx.executeSql("CREATE TABLE gammes (code TEXT,gamme TEXT);")
        tx.executeSql("CREATE TABLE modeles (code TEXT,modele TEXT,gamme_code TEXT);")
        tx.executeSql("CREATE TABLE modules (code TEXT,gamme TEXT,designation TEXT,prix DOUBLE,tva BOOL);")
        tx.executeSql("CREATE TABLE devis (code TEXT,date TEXT,tt_ht DOUBLE,tt_tvac DOUBLE,tt_tvav DOUBLE,tt_ttc DOUBLE);")
        tx.executeSql("CREATE TABLE devis_list (idx INTEGER PRIMARY KEY,code TEXT,designation TEXT,reference TEXT,quantite INT,prix_unite DOUBLE,montant_ht DOUBLE,tva BOOL);")
        testpopulate(tx)
    })
    db.changeVersion("","1.0")
}

function testpopulate(tx) {
    // USERS ###########################
    tx.executeSql("INSERT INTO users VALUES(?,?,?);",['123','killian','error404'])
    tx.executeSql("INSERT INTO users VALUES(?,?,?);",['456','richard','testrichard'])
    tx.executeSql("INSERT INTO users VALUES(?,?,?);",['789','alain','testalain'])
    tx.executeSql("INSERT INTO users VALUES(?,?,?);",['87123','alexandre','aleglise'])
    tx.executeSql("INSERT INTO users VALUES(?,?,?);",['777','demo','demo'])
    // CLIENTS #########################
    var clt = ['123-444','123','monsieur','Dupond','Pierre','14, rue de la jolie','LANDERNEAU','29800','0699331122','pas d\'email']
    tx.executeSql("INSERT INTO clients VALUES(?,?,?,?,?,?,?,?,?,?);",clt)
    clt = ['456-545','456','madame','L\'îrchant','Laurette','21, avenue bon pain','BREST','29200','0298121212',"mamielaurette92@hotmail.fr"]
    tx.executeSql("INSERT INTO clients VALUES(?,?,?,?,?,?,?,?,?,?);",clt)
    clt = ['123-358','123','famille','Soma','','4bis, ruelle perdue','LESNEVEN','29260','0298054556','famille.soma@gmail.com']
    tx.executeSql("INSERT INTO clients VALUES(?,?,?,?,?,?,?,?,?,?);",clt)
    // PROJETS #########################
    var prjt = ['123-444-435','123-444','Brouillon','Villa bretagne','Place Sanquer','29XXX','PLOUDALMEZEAU','02/04/2017','12','12-2']
    tx.executeSql("INSERT INTO projects VALUES(?,?,?,?,?,?,?,?,?,?);",prjt)
    prjt = ['123-444-568','123-444','Envoyé','Villa bretagne 2','Place Henri VIII','29XXX','GUISSENY','03/04/2017','13','13-1']
    tx.executeSql("INSERT INTO projects VALUES(?,?,?,?,?,?,?,?,?,?);",prjt)
    prjt = ['123-358-411','123-358','Validé','Maison de campagne','34, allée de l\'azalée','20290','GUIPAVAS','04/04/2017','12','12-1']
    tx.executeSql("INSERT INTO projects VALUES(?,?,?,?,?,?,?,?,?,?);",prjt)
    // GAMMES ##########################
    tx.executeSql("INSERT INTO gammes VALUES(?,?);",['12','Océane'])
    tx.executeSql("INSERT INTO gammes VALUES(?,?);",['13','Savoyarde'])
    tx.executeSql("INSERT INTO gammes VALUES(?,?);",['14','Italienne'])
    tx.executeSql("INSERT INTO gammes VALUES(?,?);",['15','Armoricaine'])
    // MODELES #########################
    tx.executeSql("INSERT INTO modeles VALUES(?,?,?);",['12-1','Australie','12'])
    tx.executeSql("INSERT INTO modeles VALUES(?,?,?);",['12-2','Calédonie','12'])
    tx.executeSql("INSERT INTO modeles VALUES(?,?,?);",['12-3','Cuba','12'])
    tx.executeSql("INSERT INTO modeles VALUES(?,?,?);",['13-1','Dijon','13'])
    tx.executeSql("INSERT INTO modeles VALUES(?,?,?);",['13-2','Bresse','13'])
    tx.executeSql("INSERT INTO modeles VALUES(?,?,?);",['14-1','Rome','14'])
    tx.executeSql("INSERT INTO modeles VALUES(?,?,?);",['14-2','Venise','14'])
    tx.executeSql("INSERT INTO modeles VALUES(?,?,?);",['14-3','Naples','14'])
    tx.executeSql("INSERT INTO modeles VALUES(?,?,?);",['15-1','Ouessant','15'])
    tx.executeSql("INSERT INTO modeles VALUES(?,?,?);",['15-2','Molène','15'])
    // MODULES #########################
    var module = ['mu_ex_0045','','mur exterieur bois',45.55,false]
    tx.executeSql("INSERT INTO modules VALUES(?,?,?,?,?);",module)
    module = ['mu_in_0032','','mur intérieur bois',35.55,false]
    tx.executeSql("INSERT INTO modules VALUES(?,?,?,?,?);",module)
    module = ['mo_ex_0025','','montant exterieur bois',140.8,false]
    tx.executeSql("INSERT INTO modules VALUES(?,?,?,?,?);",module)
    module = ['mo_in_0012','','montant intérieur bois',79.80,false]
    tx.executeSql("INSERT INTO modules VALUES(?,?,?,?,?);",module)
    module = ['wi_xx_0104','','fenêtre simple',120.45,true]
    tx.executeSql("INSERT INTO modules VALUES(?,?,?,?,?);",module)
    module = ['wi_xx_0029','','fenêtre double',267.35,true]
    tx.executeSql("INSERT INTO modules VALUES(?,?,?,?,?);",module)
    // DEVIS ###########################
    var devis = ['123-444-568','03/04/2017',212500.88,5321,10436.2,228258.08]
    tx.executeSql("INSERT INTO devis VALUES(?,?,?,?,?,?);",devis)
    devis = ['123-358-411','04/04/2017',123548.1,1472,3571.18,128591.28]
    tx.executeSql("INSERT INTO devis VALUES(?,?,?,?,?,?);",devis)
    // DEVIS LIST ######################
    // 123-444-568
    var devislist = ['123-444-568','mur extérieur bois','mu_ex_0045',30,45.55,1366.5,false]
    tx.executeSql("INSERT INTO devis_list VALUES(NULL,?,?,?,?,?,?,?);",devislist)
    devislist = ['123-444-568','mur intérieur bois','mu_in_0032',28,35.55,995.4,false]
    tx.executeSql("INSERT INTO devis_list VALUES(NULL,?,?,?,?,?,?,?);",devislist)
    devislist = ['123-444-568','montant extérieur bois','mo_ex_0025',6,140.8,844.8,false]
    tx.executeSql("INSERT INTO devis_list VALUES(NULL,?,?,?,?,?,?,?);",devislist)
    //
    // 123-358-411
    devislist = ['123-358-411','mur extérieur bois','mu_ex_0045',30,45.55,1366.5,false]
    tx.executeSql("INSERT INTO devis_list VALUES(NULL,?,?,?,?,?,?,?);",devislist)
    devislist = ['123-358-411','mur intérieur bois','mu_in_0032',28,35.55,995.4,false]
    tx.executeSql("INSERT INTO devis_list VALUES(NULL,?,?,?,?,?,?,?);",devislist)
    devislist = ['123-358-411','montant extérieur bois','mu_ex_0045',6,140.8,844.8,false]
    tx.executeSql("INSERT INTO devis_list VALUES(NULL,?,?,?,?,?,?,?);",devislist)
    //
    // TODO : montant intérieur
    // TODO : porte entrée
    // TODO : fenêtre
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
    clientView.nameSearch.text = ""
    clientView.nicknameSearch.text = ""
    clientView.newClient = false
    clientView.selClient = false
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
    clientView.cityLab.color = "black"
    clientView.cityEdit.text = ""
    clientView.phoneLab.color = "black"
    clientView.phoneEdit.text = ""
    clientView.emailLab.color = "black"
    clientView.emailEdit.text = ""
    clientView.lstmodel.clear()
    clients = []
    rackdb.transaction(function(tx) {
        var rs = tx.executeSql("SELECT code,civilite,nom,prenom,adresse,ville,postal FROM clients ORDER BY nom,prenom;")
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
                adresse: rs.rows.item(i).adresse, postal: rs.rows.item(i).postal,
                ville: rs.rows.item(i).ville.toUpperCase()
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
    clientView.cityLab.color = "black"
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
    if (clientView.civiliteBtn3.checked) req.push('')
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
    // get the city
    if (clientView.cityEdit.text == "") {
        clientView.cityLab.color = "red"
        return
    }
    else req.push(clientView.cityEdit.text)
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
        tx.executeSql("INSERT INTO clients VALUES(?,?,?,?,?,?,?,?,?,?);",req)
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
    projectView.newProject = false
    projectView.selProject = false
    projectView.nameLab.color = "black"
    projectView.adressLab.color = "black"
    projectView.postalLab.color = "black"
    projectView.cityLab.color = "black"
    projectView.nameEdit.text = ""
    projectView.adressEdit.text = ""
    projectView.postalEdit.text = ""
    projectView.cityEdit.text = ""
    projects = []
    projectView.lstmodel.clear()
    rackdb.transaction(function(tx) {
        // set client infos
        var rs = tx.executeSql("SELECT * FROM clients WHERE code=?;",[root.clientcode])
        projectView.clientLn1.text = clientLabGen(rs)
        projectView.clientLn2.text = rs.rows.item(0).adresse+" "+rs.rows.item(0).postal+" "+rs.rows.item(0).ville.toUpperCase()
        projectView.clientLnPhone.text = rs.rows.item(0).phone
        // set client projects list
        rs = tx.executeSql("SELECT code,statut,nom,adresse,postal,ville FROM projects WHERE client=?;",[root.clientcode])
        for (var i=0;i<rs.rows.length;i++) {
            var rep = {
                code: rs.rows.item(i).code, statut: rs.rows.item(i).statut,
                nom: rs.rows.item(i).nom, adresse: rs.rows.item(i).adresse,
                postal: rs.rows.item(i).postal, ville: rs.rows.item(i).ville.toUpperCase()
            }
            projects.push(rep)
            projectView.lstmodel.append(rep)
        }
    })
}

function accessModClient() {
    initModClientView()
    mainStack.push(modClientView)
}

function initModClientView() {
    rackdb.transaction(function(tx) {
        var rs = tx.executeSql("SELECT * FROM clients WHERE code=?;",[root.clientcode])
        // civilite
        modClientView.civiliteBtn1.checked = false
        modClientView.civiliteBtn2.checked = false
        modClientView.civiliteBtn3.checked = false
        if (rs.rows.item(0).civilite == 'monsieur') modClientView.civiliteBtn1.checked = true
        else if (rs.rows.item(0).civilite == 'madame') modClientView.civiliteBtn2.checked = true
        else modClientView.civiliteBtn3.checked = true
        // name
        modClientView.nameEdit.text = rs.rows.item(0).nom
        // nickname
        if (rs.rows.item(0).civilite == 'famille') {
            modClientView.nicknameEdit.enabled = false
        }
        else {
            modClientView.nicknameEdit.enabled = true
            modClientView.nicknameEdit.text = rs.rows.item(0).prenom
        }
        // adress
        modClientView.adressEdit.text = rs.rows.item(0).adresse
        // postal
        modClientView.postalEdit.text = rs.rows.item(0).postal
        // city
        modClientView.cityEdit.text = rs.rows.item(0).ville
        // phone
        modClientView.phoneEdit.text = rs.rows.item(0).phone
        // email
        modClientView.emailEdit.text = rs.rows.item(0).mail
    })
}

function modClient() {
    modClientView.nameLab.color = "black"
    modClientView.nicknameLab.color = "black"
    modClientView.adressLab.color = "black"
    modClientView.postalLab.color = "black"
    modClientView.cityLab.color = "black"
    modClientView.phoneLab.color = "black"
    modClientView.emailLab.color = "black"
    var req = []
    // get the civilite
    if (modClientView.civiliteBtn1.checked) req.push("monsieur")
    else if (modClientView.civiliteBtn2.checked) req.push("madame")
    else req.push("famille")
    // get the name
    if (modClientView.nameEdit.text == "") {
        modClientView.nameLab.color = "red"
        return
    }
    else req.push(modClientView.nameEdit.text)
    // get the nickname
    if (modClientView.civiliteBtn3.checked) req.push('')
    else if (modClientView.nicknameEdit.text == "") {
        modClientView.nicknameLab.color = "red"
        return
    }
    else req.push(modClientView.nicknameEdit.text)
    // get the adress
    if (modClientView.adressEdit.text == "") {
        modClientView.adressLab.color = "red"
        return
    }
    else req.push(modClientView.adressEdit.text)
    // get the city
    if (modClientView.cityEdit.text == "") {
        modClientView.cityLab.color = "red"
        return
    }
    else req.push(modClientView.cityEdit.text)
    // get the postal code
    if (modClientView.postalEdit.text == "") {
        modClientView.postalLab.color = "red"
        return
    }
    else req.push(modClientView.postalEdit.text)
    // get the phone
    if (modClientView.phoneEdit.text == "") {
        modClientView.phoneLab.color = "red"
        return
    }
    else req.push(modClientView.phoneEdit.text)
    // get the email
    if (modClientView.emailEdit.text == "") {
        modClientView.emailLab.color = "red"
        return
    }
    else req.push(modClientView.emailEdit.text)
    // save in db
    req.push(root.clientcode)
    rackdb.transaction(function(tx) {
        tx.executeSql("UPDATE clients SET civilite=?,nom=?,prenom=?,adresse=?,ville=?,postal=?,phone=?,mail=? WHERE code=?;",req)
        //mainStack.pop()
        backStack()
    })
}

function createProject() {
    rackdb.transaction(function(tx) {
        var dte = new Date()
        projectView.nameLab.color = "black"
        projectView.adressLab.color = "black"
        var code = root.clientcode+"-"+dte.getFullYear()
        code += ((dte.getMonth() < 10)? "0" : "")+dte.getMonth()
        code += ((dte.getDay() < 10)? "0" : "")+dte.getDay()
        code += ((dte.getHours() < 10)? "0" : "")+dte.getHours()
        code += ((dte.getMinutes() < 10)? "0" : "")+dte.getMinutes()
        code += ((dte.getSeconds() < 10)? "0" : "")+dte.getSeconds()
        var req = [code,root.clientcode,'Brouillon']
        if (projectView.nameEdit.text == "") {
            projectView.nameLab.color = "red"
            return
        }
        else req.push(projectView.nameEdit.text)
        if (projectView.adressEdit.text == "") {
            projectView.adressLab.color = "red"
            return
        }
        else req.push(projectView.adressEdit.text)
        if (projectView.postalEdit.text == "") {
            projectView.postalLab.color = "red"
            return
        }
        else req.push(projectView.postalEdit.text)
        if (projectView.cityEdit.text == "") {
            projectView.cityLab.color = "red"
            return
        }
        else req.push(projectView.cityEdit.text)
        var date = ((dte.getDay() < 10)? "0" : "")+dte.getDay()
        date += "/"+((dte.getMonth() < 10)? "0" : "")+dte.getMonth()
        date += "/"+dte.getFullYear()
        req.push(date)
        tx.executeSql("INSERT INTO projects VALUES(?,?,?,?,?,?,?,?,'0','0');",req)
        accessProject(code)
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

function accessModel(code) {
    root.projectcode = code
    initModelView()
    mainStack.push(modelView)
}

var init_model = false
function initModelView() {
    modelView.lstgammes.clear()
    modelView.lstgammes.append({text: "--- non sélectionné ---", code: '0'})
    modelView.lstmodeles.clear()
    modelView.lstmodeles.append({text: "--- non sélectionné ---", code: '0'})
    // get infos
    rackdb.transaction(function(tx) {
        var rs = tx.executeSql("SELECT * FROM projects WHERE code=?;",[root.projectcode])
        modelView.projectLn1.text = rs.rows.item(0).nom+" ("+rs.rows.item(0).statut+")"
        modelView.projectLn2.text = rs.rows.item(0).adresse+" "+rs.rows.item(0).postal+" "+rs.rows.item(0).ville
        // saved some values
        var statut = rs.rows.item(0).statut
        var gamme_code = rs.rows.item(0).gamme
        var modele_code = rs.rows.item(0).modele
        // set gammes combobox
        var rs = tx.executeSql("SELECT * FROM gammes;")
        var lst_codegamme = []
        for (var i=0;i<rs.rows.length;i++) {
            modelView.lstgammes.append({text: rs.rows.item(i).gamme, code: rs.rows.item(i).code})
            lst_codegamme.push(rs.rows.item(i).code)
        }
        // set modele combobox
        var rs = tx.executeSql("SELECT * FROM modeles WHERE gamme_code=?;",[gamme_code])
        var lst_codemodele = []
        for (var i=0;i<rs.rows.length;i++) {
            modelView.lstmodeles.append({text: rs.rows.item(i).modele, code: rs.rows.item(i).code})
            lst_codemodele.push(rs.rows.item(i).code)
        }
        // configure the visibility and data showed
        init_model = true
        if (statut == "Validé" || statut == "Envoyé") {
            modelView.workshopBtn.btnLabel = "Devis"
            modelView.gammeValue.visible = true
            modelView.gammeEdit.visible = false
            if (gamme_code == '0') modelView.gammeValue.text = "Non défini"
            else {
                var rs = tx.executeSql("SELECT gamme FROM gammes WHERE code=?;",[gamme_code])
                modelView.gammeValue.text = rs.rows.item(0).gamme
            }
            modelView.modeleValue.visible = true
            modelView.modeleEdit.visible = false
            if (modele_code == '0') modelView.modeleValue.text = "Non défini"
            else {
                var rs = tx.executeSql("SELECT modele FROM modeles WHERE code=?;",[modele_code])
                modelView.modeleValue.text = rs.rows.item(0).modele
            }
        }
        else if (statut == "Brouillon") {
            modelView.workshopBtn.btnLabel = "Atelier"
            modelView.gammeValue.visible = false
            modelView.gammeEdit.visible = true
            if (gamme_code == '0') modelView.gammeEdit.currentIndex = 0
            else {
                for (var i=0;i<lst_codegamme.length;i++) {
                    if (lst_codegamme[i] == gamme_code) { modelView.gammeEdit.currentIndex = i+1; break }
                }
            }
            modelView.modeleValue.visible = false
            modelView.modeleEdit.visible = true
            if (modele_code == '0') modelView.modeleEdit.currentIndex = 0
            else {
                for (var i=0;i<lst_codemodele.length;i++) {
                    if (lst_codemodele[i] == modele_code) { modelView.modeleEdit.currentIndex = i+1; break }
                }
            }
        }
        init_model = false
    })
}

function changeGamme(code) {
    if (init_model) return
    rackdb.transaction(function(tx) {
        tx.executeSql("UPDATE projects SET gamme=?,modele='0' WHERE code=?;",[code,root.projectcode])
        modelView.lstmodeles.clear()
        modelView.lstmodeles.append({text: "--- non sélectionné ---", code: '0'})
        var rs = tx.executeSql("SELECT * FROM modeles WHERE gamme_code=?;",[code])
        for (var i=0;i<rs.rows.length;i++) {
            modelView.lstmodeles.append({text: rs.rows.item(i).modele, code: rs.rows.item(i).code})
        }
        modelView.modeleEdit.currentIndex = 0
    })
}

function changeModele(code) {
    if (init_model) return
    rackdb.transaction(function(tx) {
        tx.executeSql("UPDATE projects SET modele=? WHERE code=?;",[code,root.projectcode])
    })
}

function accessModProject() {
    //
    //init
    //
    mainStack.push(modProjectView)
}

function accessProject() {
    rackdb.transaction(function(tx) {
        var rs = tx.executeSql("SELECT * FROM projects WHERE code=?;",[root.projectcode])
        if (rs.rows.item(0).statut == "Brouillon") {
            initWorkshopView()
            mainStack.push(workshopView)
        }
        else if (rs.rows.item(0).statut == "Validé" || rs.rows.item(0).statut == "Envoyé") {
            initDevisView()
            mainStack.push(devisView)
        }
    })
}

function initWorkshopView() {
    workshopView.toolFilter.text = ""
    workshopView.toolsModel.clear()
    workshopView.projectModel.clear()
    modules = []
    devis_list = []
    rackdb.transaction(function(tx) {
        var rs = tx.executeSql("SELECT * FROM modules;")
        for (var i=0;i<rs.rows.length;i++) {
            var obj = {
                code: rs.rows.item(i).code,
                designation: rs.rows.item(i).designation,
                prix: rs.rows.item(i).prix
            }
            modules.push(obj)
            workshopView.toolsModel.append(obj)
        }
        rs = tx.executeSql("SELECT * FROM devis_list WHERE code=? ORDER BY idx;",[root.projectcode])
        for (var i=0;i<rs.rows.length;i++) {
            var obj = {
                idx: rs.rows.item(i).idx,
                code: rs.rows.item(i).code,
                designation: rs.rows.item(i).designation,
                reference: rs.rows.item(i).reference,
                quantite: rs.rows.item(i).quantite
            }
            devis_list[rs.rows.item(i).idx] = obj
            workshopView.projectModel.append(obj)
            workshopView.lastidx = rs.rows.item(i).idx
        }
    })
}

function filterWorkshopTools(nom) {
    workshopView.toolsModel.clear()
    for (var i=0;i<modules.length;i++) {
        if (nom != "") {
            if (modules[i].designation.toLowerCase().indexOf(nom.toLowerCase(),0) == -1) continue
        }
        workshopView.toolsModel.append(modules[i])
    }
}

function addWorkshopElt(code) {
    rackdb.transaction(function(tx) {
        var rs = tx.executeSql("SELECT * FROM modules WHERE code=?;",[code])
        workshopView.lastidx++
        var obj = {
            idx: workshopView.lastidx,
            code: root.projectcode,
            designation: rs.rows.item(0).designation,
            reference: rs.rows.item(0).code,
            quantite: 1
        }
        devis_list[workshopView.lastidx] = obj
        workshopView.projectModel.append(obj)
    })
}

function removeWorkshopElt(idx,cid) {
    delete devis_list[idx]
    workshopView.projectModel.remove(cid)
}

function changeWorkshopQuantite(idx,value) {
    devis_list[idx].quantite = value
}

function saveWorkshop() {
    console.log("save workshop")
    rackdb.transaction(function(tx) {
        tx.executeSql("DELETE FROM devis_list WHERE code=?;",[root.projectcode])
        for (var key in devis_list) {
            var rs = tx.executeSql("SELECT * FROM modules WHERE code=?;",[devis_list[key].reference])
            var req = [root.projectcode]
            req.push(devis_list[key].designation)
            req.push(devis_list[key].reference)
            req.push(devis_list[key].quantite)
            req.push(rs.rows.item(0).prix)
            req.push(devis_list[key].quantite*rs.rows.item(0).prix)
            req.push(rs.rows.item(0).tva)
            tx.executeSql("INSERT INTO devis_list VALUES(NULL,?,?,?,?,?,?,?);",req)
        }
        tx.executeSql("UPDATE projects SET statut='Brouillon' WHERE code=?;",[root.projectcode])
    })
}

function validWorkshop() {
    saveWorkshop()
    rackdb.transaction(function(tx) {
        tx.executeSql("DELETE FROM devis WHERE code=?;",[root.projectcode])
        var req = [root.projectcode]
        var dte = new Date()
        var txt = ((dte.getDay() < 10)? "0" : "")+dte.getDay()+"/"
        txt += ((dte.getMonth() < 10)? "0" : "")+dte.getMonth()+"/"
        txt += dte.getFullYear()
        req.push(txt)
        var rs = tx.executeSql("SELECT * FROM devis_list WHERE code=?;",[root.projectcode])
        var tt_ht = 0, tt_tvac = 0, tt_tvav = 0, tt_ttc = 0
        for (var i=0;i<rs.rows.length;i++) {
            var tmp1 = rs.rows.item(i).montant_ht
            var tmp2 = 0
            tt_ht += tmp1
            if (rs.rows.item(i).tva) {
                tmp2 = tmp1*0.2; tt_tvav += tmp2
            }
            else {
                tmp2 = tmp1*0.05; tt_tvac += tmp2
            }
            tt_ttc += tmp1+tmp2
        }
        req.push(tt_ht); req.push(tt_tvac); req.push(tt_tvav); req.push(tt_ttc)
        tx.executeSql("INSERT INTO devis VALUES(?,?,?,?,?,?);",req)
        tx.executeSql("UPDATE projects SET statut='Validé' WHERE code=?;",[root.projectcode])
        initDevisView()
        mainStack.replace(devisView)
    })
}

function initDevisView() {
    rackdb.transaction(function(tx) {
        var rs = tx.executeSql("SELECT * FROM projects WHERE code=?;",[root.projectcode])
        devisView.statutDevisLab = rs.rows.item(0).statut
        devisView.adressLab = rs.rows.item(0).adresse+" "+rs.rows.item(0).postal+" "+rs.rows.item(0).ville.toUpperCase()
        if (rs.rows.item(0).statut == "Validé") devisView.btns = true
        else devisView.btns = false
        var gamme_code = rs.rows.item(0).gamme
        var modele_code = rs.rows.item(0).modele
        if (gamme_code == '0') devisView.gammeLab = "Non défini"
        else {
            rs = tx.executeSql("SELECT gamme FROM gammes WHERE code=?;",[gamme_code])
            devisView.gammeLab = rs.rows.item(0).gamme
        }
        if (modele_code == '0') devisView.modeleLab = "Non défini"
        else {
            rs = tx.executeSql("SELECT modele FROM modeles WHERE code=?;",[modele_code])
            devisView.modeleLab = rs.rows.item(0).modele
        }
        rs = tx.executeSql("SELECT * FROM devis WHERE code=?;",[root.projectcode])
        devisView.dateLab = rs.rows.item(0).date
        devisView.tt_ht_lab = numberToString(rs.rows.item(0).tt_ht)+" €"
        devisView.tva5_lab = numberToString(rs.rows.item(0).tt_tvac)+" €"
        devisView.tva20_lab = numberToString(rs.rows.item(0).tt_tvav)+" €"
        devisView.tt_ttc_lab = numberToString(rs.rows.item(0).tt_ttc)+" €"
        rs = tx.executeSql("SELECT civilite,nom,prenom FROM clients WHERE code=?;",[root.clientcode])
        devisView.clientLab = clientLabGen(rs)
        rs = tx.executeSql("SELECT * FROM devis_list WHERE code=?;",[root.projectcode])
        devisView.lstmodel.clear()
        for (var i=0;i<rs.rows.length;i++) {
            var obj = {
                designation: rs.rows.item(i).designation,
                reference: rs.rows.item(i).reference,
                unite: numberToString(rs.rows.item(i).prix_unite)+" €",
                quantite: rs.rows.item(i).quantite,
                totalht: numberToString(rs.rows.item(i).montant_ht)+" €",
                tva: rs.rows.item(i).tva
            }
            devisView.lstmodel.append(obj)
        }
    })
}

function goBackToWorkshop() {
    initWorkshopView()
    mainStack.replace(workshopView)
}

function validDevis() {
    rackdb.transaction(function(tx) {
        tx.executeSql("UPDATE projects SET statut='Envoyé' WHERE code=?;",[root.projectcode])
        mainStack.push(validityView)
        validityView.timer.start()
    })
}

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
        initClientView()
    }
    else if (mainStack.currentItem == projectView) {
        initProjectView()
    }
    else if (mainStack.currentItem == modelView) {
        initModelView()
    }
    else if (mainStack.currentItem == workshopView) {
    }
    else if (mainStack.currentItem == devisView) {
        initDevisView()
    }
}
