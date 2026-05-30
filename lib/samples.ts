export type Sample = {
  label: string;
  language: string;
  code: string;
};

export const SAMPLES: Sample[] = [
  {
    label: 'Python — order processor',
    language: 'Python',
    code: `def process_orders(orders, tax_rate, discount_rules, inventory, user_type):
    results = []
    total_revenue = 0
    failed = []

    for order in orders:
        try:
            if "items" not in order or len(order["items"]) == 0:
                failed.append({"id": order.get("id"), "reason": "No items"})
                continue

            subtotal = 0
            order_summary = ""

            for item in order["items"]:
                if item["sku"] not in inventory:
                    failed.append({
                        "id": order.get("id"),
                        "reason": "Missing SKU " + item["sku"]
                    })
                    subtotal = -1
                    break

                if inventory[item["sku"]] < item["qty"]:
                    failed.append({
                        "id": order.get("id"),
                        "reason": "Insufficient inventory for " + item["sku"]
                    })
                    subtotal = -1
                    break

                price = item["price"] * item["qty"]

                if user_type == "premium":
                    price = price * 0.95
                elif user_type == "vip":
                    price = price * 0.9

                for rule in discount_rules:
                    if rule["type"] == "category":
                        if item.get("category") == rule["value"]:
                            price -= price * rule["discount"]
                    elif rule["type"] == "sku":
                        if item["sku"] == rule["value"]:
                            price -= price * rule["discount"]

                subtotal += price
                inventory[item["sku"]] -= item["qty"]

                order_summary += (
                    item["sku"] + ":" +
                    str(item["qty"]) + ":" +
                    str(round(price, 2)) + "|"
                )

            if subtotal == -1:
                continue

            tax = subtotal * tax_rate
            shipping = 0 if subtotal > 1000 else 50
            grand_total = subtotal + tax + shipping

            if grand_total < 0:
                failed.append({"id": order.get("id"), "reason": "Negative total"})
                continue

            results.append({
                "id": order.get("id"),
                "subtotal": round(subtotal, 2),
                "tax": round(tax, 2),
                "shipping": shipping,
                "total": round(grand_total, 2),
                "summary": order_summary[:-1]
            })
            total_revenue += grand_total
        except Exception as e:
            failed.append({"id": order.get("id"), "reason": str(e)})

    return {
        "orders": results,
        "failed": failed,
        "revenue": round(total_revenue, 2),
        "remaining_inventory": inventory
    }`,
  },
  {
    label: 'TypeScript — React form',
    language: 'TypeScript',
    code: `import { useState } from "react";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: string[] = [];

    if (!email) {
      errs.push("Email is required");
    } else if (!email.includes("@")) {
      errs.push("Email is invalid");
    } else if (email.length > 255) {
      errs.push("Email is too long");
    }

    if (!password) {
      errs.push("Password is required");
    } else if (password.length < 8) {
      errs.push("Password too short");
    } else if (password.length > 100) {
      errs.push("Password too long");
    } else if (!/[0-9]/.test(password)) {
      errs.push("Password needs a number");
    } else if (!/[A-Z]/.test(password)) {
      errs.push("Password needs a capital");
    }

    if (!confirm) {
      errs.push("Confirm your password");
    } else if (confirm !== password) {
      errs.push("Passwords do not match");
    }

    if (!age) {
      errs.push("Age is required");
    } else if (isNaN(Number(age))) {
      errs.push("Age must be a number");
    } else if (Number(age) < 18) {
      errs.push("Must be 18+");
    } else if (Number(age) > 120) {
      errs.push("Age is invalid");
    }

    if (!country) {
      errs.push("Country is required");
    }

    setErrors(errs);
    if (errs.length === 0) {
      fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, age, country }),
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <input value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      <input value={age} onChange={(e) => setAge(e.target.value)} />
      <input value={country} onChange={(e) => setCountry(e.target.value)} />
      {errors.map((er) => (
        <p key={er}>{er}</p>
      ))}
      <button type="submit">Sign up</button>
    </form>
  );
}`,
  },
  {
    label: 'Go — HTTP handler',
    language: 'Go',
    code: `package main

import (
	"encoding/json"
	"net/http"
	"strconv"
)

func handleUser(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		id := r.URL.Query().Get("id")
		if id == "" {
			w.WriteHeader(400)
			w.Write([]byte("missing id"))
			return
		}
		n, err := strconv.Atoi(id)
		if err != nil {
			w.WriteHeader(400)
			w.Write([]byte("bad id"))
			return
		}
		user, err := db.GetUser(n)
		if err != nil {
			w.WriteHeader(500)
			w.Write([]byte("db error"))
			return
		}
		if user == nil {
			w.WriteHeader(404)
			w.Write([]byte("not found"))
			return
		}
		b, _ := json.Marshal(user)
		w.WriteHeader(200)
		w.Write(b)
	} else if r.Method == "POST" {
		var user User
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			w.WriteHeader(400)
			w.Write([]byte("bad body"))
			return
		}
		if user.Name == "" {
			w.WriteHeader(400)
			w.Write([]byte("name required"))
			return
		}
		if user.Email == "" {
			w.WriteHeader(400)
			w.Write([]byte("email required"))
			return
		}
		err = db.SaveUser(&user)
		if err != nil {
			w.WriteHeader(500)
			w.Write([]byte("save failed"))
			return
		}
		w.WriteHeader(201)
	} else {
		w.WriteHeader(405)
	}
}`,
  },
];
