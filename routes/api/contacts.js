/** @format */

const express = require("express");

const {
  ctrlWrraper,
  validation,
  auth,
  isValidId,
} = require("../../middlewares");
const { joiSchema, joiStatusSchema } = require("../../models/contacts");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

router.get("/", auth, ctrlWrraper(ctrl.listContacts));

router.get("/:userId", auth, isValidId, ctrlWrraper(ctrl.listContactsByUserId));

router.get("/:contactId", auth, isValidId, ctrlWrraper(ctrl.getContactById));

router.post("/", auth, validation(joiSchema), ctrlWrraper(ctrl.addContact));

router.delete("/:contactId", auth, isValidId, ctrlWrraper(ctrl.removeContact));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validation(joiSchema),
  ctrlWrraper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validation(joiStatusSchema),
  ctrlWrraper(ctrl.updateStatus)
);

module.exports = router;
