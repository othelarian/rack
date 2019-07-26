import QtQuick 2.7
import QtQuick.Controls 2.1

Item {
    id: devisView
    visible: false
    // properties
    property alias lstmodel: devislistmodel
    property string dateLab
    property string clientLab
    property string adressLab
    property string gammeLab
    property string modeleLab
    property alias tt_ht_lab: tt_ht_lab.text
    property alias tva5_lab: tva5_lab.text
    property alias tva20_lab: tva20_lab.text
    property alias tt_ttc_lab: tt_ttc_lab.text
    property string statutDevisLab
    property alias btns: lastrow.visible
    // elements
    ListModel { id: devislistmodel }
    Rectangle {
        anchors.top: parent.top
        anchors.topMargin: 70
        anchors.left: parent.left
        anchors.leftMargin: 20
        anchors.right: parent.right
        anchors.rightMargin: 20
        anchors.bottom: parent.bottom
        anchors.bottomMargin: 60
        color: "white"
        border.color: "black"
        border.width: 1
        Column {
            x: 10; y: 10
            spacing: 5
            Label {
                x: 10; y: 10
                color: root.trunkcol
                font.bold: true
                font.pointSize: 14
                text: "Devis MADERA"
            }
            Label { text: "Date : "+devisView.dateLab }
            Label { text: "Numéro client : "+root.clientcode }
            Label { text: "Numéro de devis : "+root.projectcode }
            Label { font.bold: true; text: "Client : "+clientLab }
            Label { text: " " }
            Row {
                spacing: 20
                Label { text: "Adresse du chantier :\n"+devisView.adressLab }
                Label { text: "Gamme sélectionnée :\n"+devisView.gammeLab }
                Label { text: "Modèle sélectionné :\n"+devisView.modeleLab }
            }
        }
        Column {
            id: sumCol
            anchors.top: parent.top
            anchors.topMargin: 10
            anchors.right: parent.right
            anchors.rightMargin: 10
            spacing: 5
            property int rowspacing: 2
            property int labwidth: 100
            Row {
                spacing: sumCol.rowspacing
                Label {
                    width: sumCol.labwidth
                    font.bold: true
                    text: "TOTAL H.T. :"
                }
                Label {
                    id: tt_ht_lab
                    width: sumCol.labwidth
                    horizontalAlignment: Text.AlignRight
                    font.bold: true
                }
            }
            Row {
                spacing: sumCol.rowspacing
                Label {
                    width: sumCol.labwidth
                    text: "T.V.A. 5.5% :"
                }
                Label {
                    id: tva5_lab
                    width: sumCol.labwidth
                    horizontalAlignment: Text.AlignRight
                }
            }
            Row {
                spacing: sumCol.rowspacing
                Label {
                    width: sumCol.labwidth
                    text: "T.V.A. 20.0% :"
                }
                Label {
                    id: tva20_lab
                    width: sumCol.labwidth
                    horizontalAlignment: Text.AlignRight
                }
            }
            Row { Label { text: " " } }
            Row {
                spacing: sumCol.rowspacing
                Label {
                    width: sumCol.labwidth
                    font.bold: true
                    text: "TOTAL T.T.C. :"
                }
                Label {
                    id: tt_ttc_lab
                    width: sumCol.labwidth
                    horizontalAlignment: Text.AlignRight
                    font.bold: true
                }
            }
        }
        Label {
            anchors.top: parent.top
            anchors.topMargin: 120
            anchors.right: parent.right
            anchors.rightMargin: 30
            font.bold: true; font.pointSize: 11
            text: "Etat du devis : "+devisView.statutDevisLab
        }
        Rectangle {
            id: devisSep
            color: "gray"
            anchors.top: parent.top
            anchors.topMargin: 160
            anchors.left: parent.left
            anchors.leftMargin: 0
            anchors.right: parent.right
            anchors.rightMargin: 0
            height: 2
        }
        Row {
            id: firstrow
            anchors.top: devisSep.bottom
            anchors.topMargin: 5
            anchors.left: parent.left
            anchors.leftMargin: 5
            anchors.right: parent.right
            anchors.rightMargin: 5
            Label {
                width: parent.width*0.34
                font.bold: true
                text: "Désignation"
            }
            Label {
                width: parent.width*0.2
                font.bold: true
                text: "Référence"
            }
            Label {
                width: parent.width*0.15
                horizontalAlignment: Text.AlignHCenter
                font.bold: true
                text: "Prix unitaire"
            }
            Label {
                width: parent.width*0.09
                horizontalAlignment: Text.AlignHCenter
                font.bold: true
                text: "Quantité"
            }
            Label {
                width: parent.width*0.14
                horizontalAlignment: Text.AlignHCenter
                font.bold: true
                text: "Total H.T."
            }
            Label {
                width: parent.width*0.08
                horizontalAlignment: Text.AlignHCenter
                font.bold: true
                text: "T.V.A."
            }
        }
        ListView {
            anchors.top: firstrow.bottom
            anchors.topMargin: 5
            anchors.left: parent.left
            anchors.leftMargin: 5
            anchors.right: parent.right
            anchors.rightMargin: 5
            anchors.bottom: parent.bottom
            anchors.bottomMargin: 5
            model: devislistmodel
            spacing: 5
            delegate: Row {
                anchors.left: parent.left
                anchors.leftMargin: 0
                anchors.right: parent.right
                anchors.rightMargin: 0
                Label {
                    width: parent.width*0.34
                    text: designation
                }
                Label {
                    width: parent.width*0.2
                    text: reference
                }
                Label {
                    width: parent.width*0.15
                    horizontalAlignment: Text.AlignRight
                    text: unite
                }
                Label {
                    width: parent.width*0.09
                    horizontalAlignment: Text.AlignHCenter
                    text: quantite
                }
                Label {
                    width: parent.width*0.14
                    horizontalAlignment: Text.AlignRight
                    text: totalht
                }
                Label {
                    width: parent.width*0.08
                    horizontalAlignment: Text.AlignHCenter
                    text: (tva)? "20.0%" : "5.5%"
                }
            }
        }
    }
    Row {
        id: lastrow
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.bottom: parent.bottom
        anchors.bottomMargin: 10
        spacing: 20
        Rectangle {
            width: 140; height: 40
            color: "gray"
            radius: 3
            MouseArea {
                anchors.fill: parent
                onClicked: { root.goBackToWorkshop() }
            }
            Text {
                anchors.centerIn: parent
                color: "white"
                font.pointSize: 12
                text: "Modifier"
            }
        }
        Rectangle {
            width: 140; height: 40
            color: root.trunkcol
            radius: 3
            MouseArea {
                anchors.fill: parent
                onClicked: { root.validDevis() }
            }
            Text {
                anchors.centerIn: parent
                color: "white"
                font.pointSize: 12
                text: "Valider"
            }
        }
    }
}
