# Copyright (c) 2022, lokesh and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document
from erpnext.controllers.item_variant import create_variant
from six import string_types
import json
from frappe.utils import flt
from frappe.utils import money_in_words
import requests

class SalesInvoice(Document):
	def validate(self):
		self.total_in_words = money_in_words(self.grand_total, "INR")
		if self.currency != "INR":
			url = "https://api.exchangerate.host/convert?from=INR&to={0}&amount={1}".format(self.currency,self.grand_total)
			response = requests.get(url)
			data = response.json()
			self.grand_total_transaction = data.get("result")
