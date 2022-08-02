// Copyright (c) 2022, lokesh and contributors
// For license information, please see license.txt

cur_frm.add_fetch('customer', 'currency', 'currency');
cur_frm.add_fetch('customer', 'company', 'company');

frappe.ui.form.on('Sales Invoice', {
	refresh: function(frm) {
		frm.set_currency_labels(['grand_total'], 'INR')
		frm.set_currency_labels(['grand_total_transaction'], 'USD')
	},
	validate: function(frm) {
		var total_amount = 0;
		$.each(frm.doc.items, function(i,v) {
				total_amount = total_amount + v.amount
		});

		frm.set_value("grand_total",total_amount)

	}
});


frappe.ui.form.on('Sales Invoice Item', {
	qty: function(frm, cdt, cdn) {
		var row = locals[cdt][cdn]
		if(row.item_code)
		{
			var amount = row.rate * row.qty
			frappe.model.set_value(cdt, cdn, "amount", amount);
		}
	},
	rate: function(frm, cdt, cdn) {
		var row = locals[cdt][cdn]
		if(row.item_code)
		{
			var amount = row.rate * row.qty
			frappe.model.set_value(cdt, cdn, "amount", amount);
		}
	}
});
