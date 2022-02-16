sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, msgBox, msgToast, model) {
        "use strict";
        return Controller.extend("yard.sapyard11.controller.AddDeleteSave", {
            onInit: function () {
                var matTable = {
                    "matTable": []
                };
                var jsonModel = new model();
                jsonModel.setData(matTable);
                this.getView().setModel(jsonModel);
            },
            onAddition: function () {
                this.tableLength = this.byId("idTable").getItems().length;
                var CC = this.byId("idCC").getValue();
                var plant = this.byId("idPlant").getValue();
                if (CC === "" && plant === "") {
                    msgBox.error("Company code and Plant should not be empty", {
                        error: "Error"
                    });
                } else {
                    var material = this.byId("matno").getValue();
                    var batch = this.byId("batch").getValue();
                    var qty = this.byId("qty").getValue();
                    var uom = this.byId("uom").getValue();
                    if (material != "" && batch != "" && qty != "" && uom != "") {
                        var itemDetails = {
                            matno: material,
                            batch: batch,
                            qty: qty,
                            uom: uom
                        }
                        var itemData = this.getView().getModel().getProperty("/matTable");
                        itemData.push(itemDetails);
                        this.getView().getModel().setProperty("/matTable", itemData);
                        if (this.tableLength < this.byId("idTable").getItems().length) {
                            msgToast.show("Record Added to Table");
                            this.byId("matno").setValue("");
                            this.byId("batch").setValue("");
                            this.byId("qty").setValue("");
                            this.byId("uom").setValue("");
                        }
                    } else {
                        msgBox.show("Material/Batch/Qty/UOM cannot be blank")
                    }
                }
            },
            onDelete: function () {
                var table = this.byId("idTable");
                var selectedItems = table.getSelectedItems();
                for (var i = selectedItems.length - 1; i >= 0; i--) {
                    var itemContextPath = selectedItems[i].getBindingContextPath();
                    var index = itemContextPath.split("/")[2];
                    var rows = this.getView().getModel().getData();
                    rows.matTable.splice(index, 1);
                }
                if (selectedItems.length > 0) {
                    this.getView().getModel().setData(rows);
                    // table.removeSelections(true);
                }
            },
            onSave: function () {
                var tableModel = this.byId("idTable").getModel();
                var tableItems = tableModel.getItems();
                var itemData = [];
                for (var rowIndex = 0; rowIndex < tableItems.length; rowIndex++) {
                    var material = tableModel.getProperty("matno", tableItems[rowIndex].getBindingContext());
                    var Batch = tableModel.getProperty("batch", tableItems[rowIndex].getBindingContext());
                    var qty = tableModel.getProperty("qty", tableItems[rowIndex].getBindingContext());
                    var uom = tableModel.getProperty("uom", tableItems[rowIndex].getBindingContext());
                    itemData.push({
                        matnr: material,
                        batch: Batch,
                        qty: qty,
                        uom: uom
                    });
                }
                var oEntry = {};
                var companyCode = this.byId("idCC").getValue();
                var plant = this.byId("idPlant").getValue();
                oEntry.bukrs = companyCode;
                oEntry.bukrs = plant;
                oEntry.itemSet = itemData;
                // oModel1.create("/Stack_HU_HeadSet", oEntry1, {
                //     success: function (oData, oResponse) {
                //         alert("The backend SAP System is Connected Successfully");

                //         var successObj = oResponse.data.HandlingUnit;
                //         var message = "Batch : " + successObj + "  " + "updated successfully";

                //         jQuery.sap.require("sap.m.MessageBox");

                //         sap.m.MessageBox.show(message, {
                //             icon: sap.m.MessageBox.Icon.SUCCESS,
                //             title: "Backend Table(s) Update Status",
                //             actions: [sap.m.MessageBox.Action.OK]
                //         });
                //     },
                //     error: function (oError) {
                //         alert("Failure - OData Service could not be called. Please check the Network Tab at Debug.");
                //     }
                // });
            }

        });
    });
