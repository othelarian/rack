import QtQuick 2.7
import QtQuick.Window 2.2
import QtQuick.Controls 2.1
import QtQuick.LocalStorage 2.0

import "Components"

import "scripts/main.js" as Main

Window {
    id: root
    visible: true
    visibility: "Maximized"
    //visibility: "FullScreen"
    width: 640; minimumWidth: 640
    height: 480; minimumHeight: 480
    title: qsTr("Logiciel de devis")
    // properties
    property var rackdb
    property string usercode
    property string clientcode
    property string projectcode
    property bool connect: false
    property bool connbtn: true
    property color forestcol: "#254835"
    property color trunkcol: "#b25309"
    // functions
    function tryConnection() { Main.tryConnection() }
    function createClient() { Main.createClient() }
    function filterClient(nom,prenom) { Main.filterClient(nom,prenom) }
    function accessClient(code) { Main.accessClient(code) }
    function createProject() { Main.createProject() }
    function filterProject(nom) { Main.filterProject(nom) }
    function accessModClient() { Main.accessModClient() }
    function accessModProject() { Main.accessModProject() }
    //
    function modClient() { Main.modClient() }
    //
    function accessModel(code) { Main.accessModel(code) }
    function changeGamme(code) { Main.changeGamme(code) }
    function changeModele(code) { Main.changeModele(code) }
    function accessProject() { Main.accessProject() }
    function filterWorkshopTools(nom) { Main.filterWorkshopTools(nom) }
    function addWorkshopElt(code) { Main.addWorkshopElt(code) }
    function removeWorkshopElt(idx,cid) { Main.removeWorkshopElt(idx,cid) }
    function changeWorkshopQuantite(idx,value) { Main.changeWorkshopQuantite(idx,value) }
    function saveWorkshop() { Main.saveWorkshop() }
    function validWorkshop() { Main.validWorkshop() }
    function goBackToWorkshop() { Main.goBackToWorkshop() }
    function validDevis() { Main.validDevis() }
    function backStack() { Main.backStack() }
    Component.onCompleted: {
        rackdb = LocalStorage.openDatabaseSync("RakDB","1.0","",2000000,Main.dbCreate)
    }
    // elements
    StackView {
        id: mainStack
        anchors.fill: parent
        initialItem: welcomeView
        WelcomeView { id: welcomeView }
        ClientView { id: clientView }
        ProjectView { id: projectView }
        ModClientView { id: modClientView }
        ModelView { id: modelView }
        ModProjectView { id: modProjectView }
        WorkshopView { id: workshopView }
        DevisView { id: devisView }
        ValidityView { id: validityView }
    }
    Rectangle {
        id: bandeau
        color: "white"
        anchors.left: parent.left
        anchors.leftMargin: 0
        anchors.right: parent.right
        anchors.rightMargin: 0
        anchors.top: parent.top
        anchors.topMargin: 0
        height: 50
        Rectangle {
            width: 50
            height: parent.height
            color: "white"
            MouseArea {
                anchors.fill: parent
                onClicked: { Main.backStack() }
            }
            Text {
                anchors.verticalCenter: parent.verticalCenter
                anchors.horizontalCenter: parent.horizontalCenter
                font.pointSize: 20
                text: "<"
            }
        }
        Image {
            x: 0+((!connbtn)? 55 : 0)
            id: mainlogo
            source: "imgs/logo_madera.png"
            height: parent.height
            fillMode: Image.PreserveAspectFit
        }
        Rectangle {
            id: connectBtn
            visible: !root.connect && connbtn
            color: "white"
            anchors.right: parent.right
            anchors.rightMargin: 0
            anchors.top: parent.top
            anchors.topMargin: 0
            anchors.bottom: parent.bottom
            anchors.bottomMargin: 0
            width: 150
            MouseArea {
                anchors.fill: parent
                onClicked: { root.connect = true }
            }
            Text {
                font.pointSize: 12
                text: "Se connecter"
                anchors.verticalCenter: parent.verticalCenter
            }
            Image {
                anchors.right: parent.right
                anchors.rightMargin: 10
                anchors.top: parent.top
                anchors.topMargin: 10
                height: parent.height-20
                source: "imgs/power-button-orange.png"
                fillMode: Image.PreserveAspectFit
            }
        }
    }
    Rectangle {
        color: "gray"
        anchors.left: parent.left
        anchors.leftMargin: 0
        anchors.right: parent.right
        anchors.rightMargin: 0
        anchors.top: bandeau.bottom
        anchors.topMargin: 0
        height: 2
    }
}
