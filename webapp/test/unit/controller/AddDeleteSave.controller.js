/*global QUnit*/

sap.ui.define([
	"yard/sapyard11/controller/AddDeleteSave.controller"
], function (Controller) {
	"use strict";

	QUnit.module("AddDeleteSave Controller");

	QUnit.test("I should test the AddDeleteSave controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
