import QtQuick 2.7
import QtQuick.Controls 2.1

Item {
    id: clientView
    visible: false
    // properties
    property alias lstmodel: clientlistmodel
    property alias civiliteBtn1: civiliteBtn1
    property alias civiliteBtn2: civiliteBtn2
    property alias civiliteBtn3: civiliteBtn3
    property alias nameLab: clientNameLab
    property alias nameEdit: clientNameEdit
    property alias nicknameLab: clientNicknameLab
    property alias nicknameEdit: clientNicknameEdit
    property alias adressLab: clientAdressLab
    property alias adressEdit: clientAdressEdit
    property alias postalLab: clientPostalLab
    property alias postalEdit: clientPostalEdit
    property alias phoneLab: clientPhoneLab
    property alias phoneEdit: clientPhoneEdit
    property alias emailLab: clientEmailLab
    property alias emailEdit: clientEmailEdit
    property alias nameSearch: cltsearchnomEdit
    property alias nicknameSearch: cltsearchprenomEdit
    property bool newClient: false
    property bool selClient: false
    property int widthrect: 460
    property int widthlab: 65
    property int heightTitle: 40
    // elements
    ListModel { id: clientlistmodel }
    Rectangle {
        id: newClientTitle
        y: 70
        anchors.horizontalCenter: parent.horizontalCenter
        color: root.forestcol
        width: parent.widthrect
        height: parent.heightTitle
        MouseArea {
            anchors.fill: parent
            onClicked: {
                if (selClient) selClient = false
                newClient = !newClient
            }
        }
        Text {
            color: "white"
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.verticalCenter: parent.verticalCenter
            font.pointSize: 12
            font.bold: true
            text: "Nouveau client"
        }
        Text {
            color: "white"
            anchors.verticalCenter: parent.verticalCenter
            anchors.right: parent.right
            anchors.rightMargin: 10
            font.pointSize: 12
            font.bold: true
            text: (newClient)? "V" : ">"
        }
    }
    Rectangle {
        id: newClientForm
        visible: parent.newClient
        anchors.top: newClientTitle.bottom
        anchors.topMargin: 0
        anchors.horizontalCenter: parent.horizontalCenter
        border.color: "gray"
        border.width: 2
        width: parent.widthrect
        height: 280
        Column {
            spacing: 10
            padding: 10
            Row {
                RadioButton {
                    id: civiliteBtn1
                    checked: true
                    text: "Monsieur"
                }
                RadioButton {
                    id: civiliteBtn2
                    text: "Madame"
                }
                RadioButton {
                    id: civiliteBtn3
                    text: "Famille"
                }
            }
            Row {
                spacing: 10
                Label {
                    id: clientNameLab
                    width: clientView.widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    color: "black"
                    text: "Nom"
                }
                TextField { id: clientNameEdit; width: 140 }
                Label {
                    id: clientNicknameLab
                    width: clientView.widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    color: "black"
                    text: "Prénom"
                }
                TextField {
                    id: clientNicknameEdit
                    width: 140
                    enabled: !civiliteBtn3.checked
                }
            }
            Row {
                spacing: 10
                Label {
                    id: clientAdressLab
                    width: clientView.widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Adresse"
                }
                TextField { id: clientAdressEdit; width: 365 }
            }
            Row {
                spacing: 10
                Label {
                    id: clientPostalLab
                    width: clientView.widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Code Postal"
                }
                TextField { id: clientPostalEdit; width: 140 }
                Label {
                    id: clientPhoneLab
                    width: clientView.widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Téléphone"
                }
                TextField { id: clientPhoneEdit; width: 140 }
            }
            Row {
                spacing: 10
                Label {
                    id: clientEmailLab
                    width: clientView.widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Email"
                }
                TextField { id: clientEmailEdit; width: 215 }
                Rectangle {
                    width: 140
                    height: parent.height
                    color: root.trunkcol
                    radius: 3
                    MouseArea {
                        anchors.fill: parent
                        onClicked: { root.createClient() }
                    }
                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        anchors.verticalCenter: parent.verticalCenter
                        color: "white"
                        text: "Créer"
                        font.pointSize: 12
                    }
                }
            }
        }
    }
    Rectangle {
        id: selClientTitle
        y: 130+((newClient)? newClientForm.height : 0)
        anchors.horizontalCenter: parent.horizontalCenter
        color: root.forestcol
        width: parent.widthrect
        height: parent.heightTitle
        MouseArea {
            anchors.fill: parent
            onClicked: {
                if (newClient) newClient = false
                selClient = !selClient
            }
        }
        Text {
            color: "white"
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.verticalCenter: parent.verticalCenter
            font.pointSize: 12
            font.bold: true
            text: "Client existant"
        }
        Text {
            color: "white"
            anchors.verticalCenter: parent.verticalCenter
            anchors.right: parent.right
            anchors.rightMargin: 10
            font.pointSize: 12
            font.bold: true
            text: (selClient)? "V" : ">"
        }
    }
    Rectangle {
        id: selClientForm
        visible: parent.selClient
        anchors.top: selClientTitle.bottom
        anchors.topMargin: 0
        anchors.horizontalCenter: parent.horizontalCenter
        border.color: "gray"
        border.width: 2
        width: parent.widthrect
        height: 270
        Row {
            x: 10; y: 10
            id: clientsearchrow
            spacing: 10
            Label {
                width: clientView.widthlab-20
                anchors.verticalCenter: parent.verticalCenter
                text: "Nom"
            }
            TextField {
                id: cltsearchnomEdit
                width: 160
                onTextChanged: {
                    root.filterClient(cltsearchnomEdit.text,cltsearchprenomEdit.text)
                }
            }
            Label {
                width: clientView.widthlab-20
                anchors.verticalCenter: parent.verticalCenter
                text: "Prénom"
            }
            TextField {
                id: cltsearchprenomEdit
                width: 160
                onTextChanged: {
                    root.filterClient(cltsearchnomEdit.text,cltsearchprenomEdit.text)
                }
            }
        }
        ListView {
            anchors.top: clientsearchrow.bottom
            anchors.topMargin: 30
            anchors.left: parent.left
            anchors.leftMargin: 10
            anchors.right: parent.right
            anchors.rightMargin: 10
            anchors.bottom: parent.bottom
            anchors.bottomMargin: 30
            interactive: true
            spacing: 5
            model: clientlistmodel
            delegate: Rectangle {
                color: "white"
                border.color: "black"
                border.width: 1
                width: 360
                height: 50
                anchors.horizontalCenter: parent.horizontalCenter
                MouseArea {
                    anchors.fill: parent
                    onClicked: { root.accessClient(code) }
                }
                Text {
                    x: 10; y: 5
                    font.pointSize: 11; font.bold: true
                    text: value
                }
                Text { x: 10; y: 30; text: adresse+" "+postal }
                Text {
                    anchors.verticalCenter: parent.verticalCenter
                    anchors.right: parent.right
                    anchors.rightMargin: 20
                    color: root.trunkcol
                    font.pointSize: 20
                    font.bold: true
                    text: ">"
                }
            }
        }
    }
}
