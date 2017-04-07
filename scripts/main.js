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
        tx.executeSql("CREATE TABLE clients (code TEXT,user TEXT,civilite TEXT,nom TEXT,prenom TEXT,adresse TEXT,postal TEXT,phone TEXT,mail TEXT);")
        tx.executeSql("CREATE TABLE projects (code TEXT,client TEXT,statut TEXT,nom TEXT,adresse TEXT,date TEXT);")
        //
        tx.executeSql("CREATE TABLE modules (code TEXT,gamme TEXT,designation TEXT,prix DOUBLE,tva BOOL);")
        //
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
    // CLIENTS #########################
    var clt = ['123-444','123','monsieur','Dupond','Pierre','14, rue de la jolie LANDERNEAU','29800','0699331122','pas d\'email']
    tx.executeSql("INSERT INTO clients VALUES(?,?,?,?,?,?,?,?,?);",clt)
    clt = ['456-545','456','madame','L\'îrchant','Laurette','21, avenue bon pain BREST','29200','0298121212',"mamielaurette92@hotmail.fr"]
    tx.executeSql("INSERT INTO clients VALUES(?,?,?,?,?,?,?,?,?);",clt)
    clt = ['123-358','123','famille','Soma','','4bis, ruelle perdue LESNEVEN','29260','0298054556','famille.soma@gmail.com']
    tx.executeSql("INSERT INTO clients VALUES(?,?,?,?,?,?,?,?,?);",clt)
    // PROJETS #########################
    var prjt = ['123-444-435','123-444','Brouillon','Villa bretagne','Place Sanquer 29XXX PLOUDALMEZEAU','02/04/2017']
    tx.executeSql("INSERT INTO projects VALUES(?,?,?,?,?,?);",prjt)
    prjt = ['123-444-568','123-444','Envoyé','Villa bretagne 2','Place Henri VIII 29XXX GUISSENY','03/04/2017']
    tx.executeSql("INSERT INTO projects VALUES(?,?,?,?,?,?);",prjt)
    prjt = ['123-358-411','123-358','Validé','Maison de campagne','34, allée de l\'azalée 20290 GUIPAVAS','04/04/2017']
    tx.executeSql("INSERT INTO projects VALUES(?,?,?,?,?,?);",prjt)
    // GAMMES ##########################
    //
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
    //
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
    projectView.newProject = false
    projectView.selProject = false
    projectView.nameLab.color = "black"
    projectView.adressLab.color = "black"
    projectView.nameEdit.text = ""
    projectView.adressEdit.text = ""
    projects = []
    projectView.lstmodel.clear()
    rackdb.transaction(function(tx) {
        // set client infos
        var rs = tx.executeSql("SELECT * FROM clients WHERE code=?;",[root.clientcode])
        projectView.clientLn1.text = clientLabGen(rs)
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

function createProject() {
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
    var date = ((dte.getDay() < 10)? "0" : "")+dte.getDay()
    date += "/"+((dte.getMonths() < 10)? "0" : "")+dte.getMonths()
    date += "/"+dte.getFullYear()
    req.push(date)
    rackdb.transation(function(tx) {
        tx.executeSql("INSERT INTO projects VALUES(?,?,?,?,?);",req)
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

function accessProject(code) {
    root.projectcode = code
    rackdb.transaction(function(tx) {
        var rs = tx.executeSql("SELECT * FROM projects WHERE code=?;",[code])
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
        devisView.adressLab = rs.rows.item(0).adresse
        if (rs.rows.item(0).statut == "Validé") devisView.btns = true
        else devisView.btns = false
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
    else if (mainStack.currentItem == workshopView) {
    }
    else if (mainStack.currentItem == devisView) {
        initDevisView()
    }
}
