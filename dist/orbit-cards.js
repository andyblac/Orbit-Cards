//#region \0rolldown/runtime.js
var e = (e, t) => () => (e && (t = e(e = 0)), t), t = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), n, r, i, a, o, s, c, l, u, d = e((() => {
	n = globalThis, r = n.ShadowRoot && (n.ShadyCSS === void 0 || n.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, i = Symbol(), a = /* @__PURE__ */ new WeakMap(), o = class {
		constructor(e, t, n) {
			if (this._$cssResult$ = !0, n !== i) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
			this.cssText = e, this.t = t;
		}
		get styleSheet() {
			let e = this.o, t = this.t;
			if (r && e === void 0) {
				let n = t !== void 0 && t.length === 1;
				n && (e = a.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && a.set(t, e));
			}
			return e;
		}
		toString() {
			return this.cssText;
		}
	}, s = (e) => new o(typeof e == "string" ? e : e + "", void 0, i), c = (e, ...t) => new o(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
		if (!0 === e._$cssResult$) return e.cssText;
		if (typeof e == "number") return e;
		throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
	})(n) + e[r + 1], e[0]), e, i), l = (e, t) => {
		if (r) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
		else for (let r of t) {
			let t = document.createElement("style"), i = n.litNonce;
			i !== void 0 && t.setAttribute("nonce", i), t.textContent = r.cssText, e.appendChild(t);
		}
	}, u = r ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
		let t = "";
		for (let n of e.cssRules) t += n.cssText;
		return s(t);
	})(e) : e;
})), f, p, m, ee, te, ne, h, re, ie, ae, g, oe, se, ce, _, le = e((() => {
	d(), {is: f, defineProperty: p, getOwnPropertyDescriptor: m, getOwnPropertyNames: ee, getOwnPropertySymbols: te, getPrototypeOf: ne} = Object, h = globalThis, re = h.trustedTypes, ie = re ? re.emptyScript : "", ae = h.reactiveElementPolyfillSupport, g = (e, t) => e, oe = {
		toAttribute(e, t) {
			switch (t) {
				case Boolean:
					e = e ? ie : null;
					break;
				case Object:
				case Array: e = e == null ? e : JSON.stringify(e);
			}
			return e;
		},
		fromAttribute(e, t) {
			let n = e;
			switch (t) {
				case Boolean:
					n = e !== null;
					break;
				case Number:
					n = e === null ? null : Number(e);
					break;
				case Object:
				case Array: try {
					n = JSON.parse(e);
				} catch {
					n = null;
				}
			}
			return n;
		}
	}, se = (e, t) => !f(e, t), ce = {
		attribute: !0,
		type: String,
		converter: oe,
		reflect: !1,
		useDefault: !1,
		hasChanged: se
	}, Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap(), _ = class extends HTMLElement {
		static addInitializer(e) {
			this._$Ei(), (this.l ??= []).push(e);
		}
		static get observedAttributes() {
			return this.finalize(), this._$Eh && [...this._$Eh.keys()];
		}
		static createProperty(e, t = ce) {
			if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
				let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
				r !== void 0 && p(this.prototype, e, r);
			}
		}
		static getPropertyDescriptor(e, t, n) {
			let { get: r, set: i } = m(this.prototype, e) ?? {
				get() {
					return this[t];
				},
				set(e) {
					this[t] = e;
				}
			};
			return {
				get: r,
				set(t) {
					let a = r?.call(this);
					i?.call(this, t), this.requestUpdate(e, a, n);
				},
				configurable: !0,
				enumerable: !0
			};
		}
		static getPropertyOptions(e) {
			return this.elementProperties.get(e) ?? ce;
		}
		static _$Ei() {
			if (this.hasOwnProperty(g("elementProperties"))) return;
			let e = ne(this);
			e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
		}
		static finalize() {
			if (this.hasOwnProperty(g("finalized"))) return;
			if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(g("properties"))) {
				let e = this.properties, t = [...ee(e), ...te(e)];
				for (let n of t) this.createProperty(n, e[n]);
			}
			let e = this[Symbol.metadata];
			if (e !== null) {
				let t = litPropertyMetadata.get(e);
				if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
			}
			this._$Eh = /* @__PURE__ */ new Map();
			for (let [e, t] of this.elementProperties) {
				let n = this._$Eu(e, t);
				n !== void 0 && this._$Eh.set(n, e);
			}
			this.elementStyles = this.finalizeStyles(this.styles);
		}
		static finalizeStyles(e) {
			let t = [];
			if (Array.isArray(e)) {
				let n = new Set(e.flat(Infinity).reverse());
				for (let e of n) t.unshift(u(e));
			} else e !== void 0 && t.push(u(e));
			return t;
		}
		static _$Eu(e, t) {
			let n = t.attribute;
			return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
		}
		constructor() {
			super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
		}
		_$Ev() {
			this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
		}
		addController(e) {
			(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
		}
		removeController(e) {
			this._$EO?.delete(e);
		}
		_$E_() {
			let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
			for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
			e.size > 0 && (this._$Ep = e);
		}
		createRenderRoot() {
			let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
			return l(e, this.constructor.elementStyles), e;
		}
		connectedCallback() {
			this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
		}
		enableUpdating(e) {}
		disconnectedCallback() {
			this._$EO?.forEach((e) => e.hostDisconnected?.());
		}
		attributeChangedCallback(e, t, n) {
			this._$AK(e, n);
		}
		_$ET(e, t) {
			let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
			if (r !== void 0 && !0 === n.reflect) {
				let i = (n.converter?.toAttribute === void 0 ? oe : n.converter).toAttribute(t, n.type);
				this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
			}
		}
		_$AK(e, t) {
			let n = this.constructor, r = n._$Eh.get(e);
			if (r !== void 0 && this._$Em !== r) {
				let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? oe : e.converter;
				this._$Em = r;
				let a = i.fromAttribute(t, e.type);
				this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
			}
		}
		requestUpdate(e, t, n, r = !1, i) {
			if (e !== void 0) {
				let a = this.constructor;
				if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? se)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
				this.C(e, t, n);
			}
			!1 === this.isUpdatePending && (this._$ES = this._$EP());
		}
		C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
			n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
		}
		async _$EP() {
			this.isUpdatePending = !0;
			try {
				await this._$ES;
			} catch (e) {
				Promise.reject(e);
			}
			let e = this.scheduleUpdate();
			return e != null && await e, !this.isUpdatePending;
		}
		scheduleUpdate() {
			return this.performUpdate();
		}
		performUpdate() {
			if (!this.isUpdatePending) return;
			if (!this.hasUpdated) {
				if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
					for (let [e, t] of this._$Ep) this[e] = t;
					this._$Ep = void 0;
				}
				let e = this.constructor.elementProperties;
				if (e.size > 0) for (let [t, n] of e) {
					let { wrapped: e } = n, r = this[t];
					!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
				}
			}
			let e = !1, t = this._$AL;
			try {
				e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
			} catch (t) {
				throw e = !1, this._$EM(), t;
			}
			e && this._$AE(t);
		}
		willUpdate(e) {}
		_$AE(e) {
			this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
		}
		_$EM() {
			this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
		}
		get updateComplete() {
			return this.getUpdateComplete();
		}
		getUpdateComplete() {
			return this._$ES;
		}
		shouldUpdate(e) {
			return !0;
		}
		update(e) {
			this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
		}
		updated(e) {}
		firstUpdated(e) {}
	}, _.elementStyles = [], _.shadowRootOptions = { mode: "open" }, _[g("elementProperties")] = /* @__PURE__ */ new Map(), _[g("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: _ }), (h.reactiveElementVersions ??= []).push("2.1.2");
}));
//#endregion
//#region node_modules/lit-html/lit-html.js
function ue(e, t) {
	if (!ve(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return me === void 0 ? t : me.createHTML(t);
}
function v(e, t, n = e, r) {
	if (t === T) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = S(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = v(e, i._$AS(e, t.values), i, r)), t;
}
var de, fe, pe, me, he, y, ge, _e, b, x, S, ve, ye, be, xe, Se, Ce, C, we, Te, Ee, De, w, T, E, Oe, D, ke, Ae, je, Me, O, Ne, Pe, Fe, Ie, Le, Re, ze, k = e((() => {
	de = globalThis, fe = (e) => e, pe = de.trustedTypes, me = pe ? pe.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, he = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, ge = "?" + y, _e = `<${ge}>`, b = document, x = () => b.createComment(""), S = (e) => e === null || typeof e != "object" && typeof e != "function", ve = Array.isArray, ye = (e) => ve(e) || typeof e?.[Symbol.iterator] == "function", be = "[ 	\n\f\r]", xe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Se = /-->/g, Ce = />/g, C = RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), we = /'/g, Te = /"/g, Ee = /^(?:script|style|textarea|title)$/i, De = (e) => (t, ...n) => ({
		_$litType$: e,
		strings: t,
		values: n
	}), w = De(1), De(2), De(3), T = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), Oe = /* @__PURE__ */ new WeakMap(), D = b.createTreeWalker(b, 129), ke = (e, t) => {
		let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = xe;
		for (let t = 0; t < n; t++) {
			let n = e[t], s, c, l = -1, u = 0;
			for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === xe ? c[1] === "!--" ? o = Se : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = C) : (Ee.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = C) : o = Ce : o === C ? c[0] === ">" ? (o = i ?? xe, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? C : c[3] === "\"" ? Te : we) : o === Te || o === we ? o = C : o === Se || o === Ce ? o = xe : (o = C, i = void 0);
			let d = o === C && e[t + 1].startsWith("/>") ? " " : "";
			a += o === xe ? n + _e : l >= 0 ? (r.push(s), n.slice(0, l) + he + n.slice(l) + y + d) : n + y + (l === -2 ? t : d);
		}
		return [ue(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
	}, Ae = class e {
		constructor({ strings: t, _$litType$: n }, r) {
			let i;
			this.parts = [];
			let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ke(t, n);
			if (this.el = e.createElement(l, r), D.currentNode = this.el.content, n === 2 || n === 3) {
				let e = this.el.content.firstChild;
				e.replaceWith(...e.childNodes);
			}
			for (; (i = D.nextNode()) !== null && c.length < s;) {
				if (i.nodeType === 1) {
					if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(he)) {
						let t = u[o++], n = i.getAttribute(e).split(y), r = /([.?@])?(.*)/.exec(t);
						c.push({
							type: 1,
							index: a,
							name: r[2],
							strings: n,
							ctor: r[1] === "." ? Ne : r[1] === "?" ? Pe : r[1] === "@" ? Fe : O
						}), i.removeAttribute(e);
					} else e.startsWith(y) && (c.push({
						type: 6,
						index: a
					}), i.removeAttribute(e));
					if (Ee.test(i.tagName)) {
						let e = i.textContent.split(y), t = e.length - 1;
						if (t > 0) {
							i.textContent = pe ? pe.emptyScript : "";
							for (let n = 0; n < t; n++) i.append(e[n], x()), D.nextNode(), c.push({
								type: 2,
								index: ++a
							});
							i.append(e[t], x());
						}
					}
				} else if (i.nodeType === 8) if (i.data === ge) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(y, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += y.length - 1;
				}
				a++;
			}
		}
		static createElement(e, t) {
			let n = b.createElement("template");
			return n.innerHTML = e, n;
		}
	}, je = class {
		constructor(e, t) {
			this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
		}
		get parentNode() {
			return this._$AM.parentNode;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		u(e) {
			let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? b).importNode(t, !0);
			D.currentNode = r;
			let i = D.nextNode(), a = 0, o = 0, s = n[0];
			for (; s !== void 0;) {
				if (a === s.index) {
					let t;
					s.type === 2 ? t = new Me(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ie(i, this, e)), this._$AV.push(t), s = n[++o];
				}
				a !== s?.index && (i = D.nextNode(), a++);
			}
			return D.currentNode = b, r;
		}
		p(e) {
			let t = 0;
			for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
		}
	}, Me = class e {
		get _$AU() {
			return this._$AM?._$AU ?? this._$Cv;
		}
		constructor(e, t, n, r) {
			this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
		}
		get parentNode() {
			let e = this._$AA.parentNode, t = this._$AM;
			return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
		}
		get startNode() {
			return this._$AA;
		}
		get endNode() {
			return this._$AB;
		}
		_$AI(e, t = this) {
			e = v(this, e, t), S(e) ? e === E || e == null || e === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : e !== this._$AH && e !== T && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ye(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
		}
		O(e) {
			return this._$AA.parentNode.insertBefore(e, this._$AB);
		}
		T(e) {
			this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
		}
		_(e) {
			this._$AH !== E && S(this._$AH) ? this._$AA.nextSibling.data = e : this.T(b.createTextNode(e)), this._$AH = e;
		}
		$(e) {
			let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Ae.createElement(ue(n.h, n.h[0]), this.options)), n);
			if (this._$AH?._$AD === r) this._$AH.p(t);
			else {
				let e = new je(r, this), n = e.u(this.options);
				e.p(t), this.T(n), this._$AH = e;
			}
		}
		_$AC(e) {
			let t = Oe.get(e.strings);
			return t === void 0 && Oe.set(e.strings, t = new Ae(e)), t;
		}
		k(t) {
			ve(this._$AH) || (this._$AH = [], this._$AR());
			let n = this._$AH, r, i = 0;
			for (let a of t) i === n.length ? n.push(r = new e(this.O(x()), this.O(x()), this, this.options)) : r = n[i], r._$AI(a), i++;
			i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
		}
		_$AR(e = this._$AA.nextSibling, t) {
			for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
				let t = fe(e).nextSibling;
				fe(e).remove(), e = t;
			}
		}
		setConnected(e) {
			this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
		}
	}, O = class {
		get tagName() {
			return this.element.tagName;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		constructor(e, t, n, r, i) {
			this.type = 1, this._$AH = E, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = E;
		}
		_$AI(e, t = this, n, r) {
			let i = this.strings, a = !1;
			if (i === void 0) e = v(this, e, t, 0), a = !S(e) || e !== this._$AH && e !== T, a && (this._$AH = e);
			else {
				let r = e, o, s;
				for (e = i[0], o = 0; o < i.length - 1; o++) s = v(this, r[n + o], t, o), s === T && (s = this._$AH[o]), a ||= !S(s) || s !== this._$AH[o], s === E ? e = E : e !== E && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
			}
			a && !r && this.j(e);
		}
		j(e) {
			e === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
		}
	}, Ne = class extends O {
		constructor() {
			super(...arguments), this.type = 3;
		}
		j(e) {
			this.element[this.name] = e === E ? void 0 : e;
		}
	}, Pe = class extends O {
		constructor() {
			super(...arguments), this.type = 4;
		}
		j(e) {
			this.element.toggleAttribute(this.name, !!e && e !== E);
		}
	}, Fe = class extends O {
		constructor(e, t, n, r, i) {
			super(e, t, n, r, i), this.type = 5;
		}
		_$AI(e, t = this) {
			if ((e = v(this, e, t, 0) ?? E) === T) return;
			let n = this._$AH, r = e === E && n !== E || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== E && (n === E || r);
			r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
		}
		handleEvent(e) {
			typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
		}
	}, Ie = class {
		constructor(e, t, n) {
			this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		_$AI(e) {
			v(this, e);
		}
	}, Le = {
		M: he,
		P: y,
		A: ge,
		C: 1,
		L: ke,
		R: je,
		D: ye,
		V: v,
		I: Me,
		H: O,
		N: Pe,
		U: Fe,
		B: Ne,
		F: Ie
	}, Re = de.litHtmlPolyfillSupport, Re?.(Ae, Me), (de.litHtmlVersions ??= []).push("3.3.3"), ze = (e, t, n) => {
		let r = n?.renderBefore ?? t, i = r._$litPart$;
		if (i === void 0) {
			let e = n?.renderBefore ?? null;
			r._$litPart$ = i = new Me(t.insertBefore(x(), e), e, void 0, n ?? {});
		}
		return i._$AI(e), i;
	};
})), Be, A, Ve, He = e((() => {
	le(), le(), k(), k(), Be = globalThis, A = class extends _ {
		constructor() {
			super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
		}
		createRenderRoot() {
			let e = super.createRenderRoot();
			return this.renderOptions.renderBefore ??= e.firstChild, e;
		}
		update(e) {
			let t = this.render();
			this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ze(t, this.renderRoot, this.renderOptions);
		}
		connectedCallback() {
			super.connectedCallback(), this._$Do?.setConnected(!0);
		}
		disconnectedCallback() {
			super.disconnectedCallback(), this._$Do?.setConnected(!1);
		}
		render() {
			return T;
		}
	}, A._$litElement$ = !0, A.finalized = !0, Be.litElementHydrateSupport?.({ LitElement: A }), Ve = Be.litElementPolyfillSupport, Ve?.({ LitElement: A }), (Be.litElementVersions ??= []).push("4.2.2");
})), Ue = e((() => {})), j = e((() => {
	le(), k(), He(), Ue();
}));
//#endregion
//#region src/common/helpers/actions.js
function We(e, t = null) {
	if (!(!e || !this.hass)) switch (e.action || "toggle") {
		case "toggle": {
			if (!t) return;
			let e = t.split(".")[0];
			this.hass.callService(e, "toggle", { entity_id: t });
			break;
		}
		case "more-info":
			this.dispatchEvent(new CustomEvent("hass-more-info", {
				detail: { entityId: t },
				bubbles: !0,
				composed: !0
			}));
			break;
		case "navigate":
			this._navigate(e.navigation_path);
			break;
		case "url":
			if (!e.url_path) return;
			window.open(e.url_path, "_blank", "noopener,noreferrer");
			break;
		case "perform-action":
		case "call-service": {
			let [t, n] = (e.perform_action || e.service || "").split(".");
			if (!t || !n) return;
			this.hass.callService(t, n, e.data || e.service_data || {}, e.target);
			break;
		}
		case "fire-dom-event":
			this.dispatchEvent(new CustomEvent("ll-custom", {
				detail: { browser_mod: e.browser_mod },
				bubbles: !0,
				composed: !0
			}));
			break;
		case "popup": {
			let t = e.popup_title || e.title || " ", n = e.popup_content || e.content;
			if (!n) return;
			let r = Ge(e, t, n);
			this.dispatchEvent(new CustomEvent("ll-custom", {
				detail: { browser_mod: {
					service: "browser_mod.popup",
					data: r
				} },
				bubbles: !0,
				composed: !0
			}));
			break;
		}
		default: break;
	}
}
function Ge(e, t, n) {
	let { action: r, popup_title: i, popup_content: a, popup_options: o, title: s, content: c, ...l } = e;
	return {
		...l,
		...o || {},
		title: t,
		content: n
	};
}
function Ke(e) {
	e && (history.pushState(null, "", e), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } })));
}
function qe(e, t, n = null) {
	t.stopPropagation(), this._handleAction(n || { action: "toggle" }, e);
}
function Je(e) {
	e.stopPropagation();
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction;
	this._handleAction(n, t);
}
function Ye(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction;
	this._handleAction(n, t);
}
function Xe(e) {
	if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return;
	e.stopPropagation();
	let t = this._config.navigate || { navigation_path: "/lovelace/home" };
	this._navigate(t.navigation_path);
}
function Ze(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
	let t = this._config.main_entity || this._config.entity;
	if (t) {
		let e = this._config.main_entity_tap_action || { action: "more-info" };
		if (e.action !== "none") {
			this._handleAction(e, t);
			return;
		}
	}
	let n = this._config.navigate || { navigation_path: "/lovelace/home" };
	this._navigate(n.navigation_path);
}
var Qe = e((() => {}));
//#endregion
//#region src/common/helpers/colors.js
function $e(e) {
	if (!e) return "rgb(var(--color-theme))";
	let t = e.toString().trim();
	return N(t) ? t : rt(t);
}
function et(e) {
	if (!e) return "rgba(var(--color-theme), 0.4)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.4)" : N(t) ? `color-mix(in srgb, transparent, ${t} 70%)` : M(t, 70);
}
function tt(e) {
	if (!e) return "rgba(var(--color-theme), 0.2)";
	let t = e.toString().trim();
	return N(t) ? `color-mix(in srgb, transparent, ${t} 20%)` : t === "theme" ? "rgba(var(--color-theme), 0.05)" : M(t, 20);
}
function nt(e) {
	if (!e) return "rgba(var(--color-theme), 0.25)";
	let t = e.toString().trim();
	return N(t) ? `color-mix(in srgb, ${t} 25%, transparent)` : M(t, 25);
}
function rt(e) {
	let t = lt(e);
	if (!t) return "rgb(var(--color-theme))";
	if (t === "light") return "var(--state-light-active-color, var(--state-active-color, rgb(var(--color-theme))))";
	let n = ot(t);
	return it(t) ? n ? `rgb(var(--${n}))` : `var(--${t}-color, var(--${t}, rgb(var(--color-theme))))` : t.startsWith("color-") ? `rgb(var(--${t}))` : `var(--${t}, rgb(var(--color-${t}, var(--color-theme))))`;
}
function it(e) {
	return ut.has(lt(e));
}
function at(e) {
	return !!ot(e);
}
function ot(e) {
	let t = lt(e);
	return t && st(t).find(ct) || "";
}
function st(e) {
	let t = e.startsWith("color-") ? e.slice(6) : e, n = dt[t] || [];
	return [`color-${t}`, ...n.map((e) => `color-${e}`)];
}
function ct(e) {
	return typeof document > "u" ? !1 : [document.documentElement, document.body].filter(Boolean).some((t) => getComputedStyle(t).getPropertyValue(`--${e}`).trim());
}
function M(e, t) {
	return `color-mix(in srgb, transparent, ${rt(e)} ${t}%)`;
}
function N(e) {
	let t = e.toString().trim();
	return t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("#");
}
function lt(e) {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
}
var ut, dt, P = e((() => {
	ut = new Set([
		"red",
		"pink",
		"purple",
		"deep-purple",
		"indigo",
		"blue",
		"light-blue",
		"cyan",
		"teal",
		"green",
		"light-green",
		"lime",
		"yellow",
		"amber",
		"orange",
		"deep-orange",
		"brown",
		"light-grey",
		"grey",
		"dark-grey",
		"blue-grey",
		"black",
		"white",
		"disabled"
	]), dt = {
		"blue-grey": ["bluegrey"],
		"dark-grey": ["darkgrey"],
		"deep-orange": ["deeporange"],
		"deep-purple": ["deeppurple"],
		"light-blue": ["lightblue"],
		"light-green": ["lightgreen"],
		"light-grey": ["lightgrey"]
	};
}));
//#endregion
//#region src/common/helpers/card-name.js
function ft(e, t, n = "Card") {
	if (e.name) return e.name;
	if (e.card_name) return e.card_name;
	if (e.room_name) return e.room_name;
	if (e.status_name) return e.status_name;
	let r = e.area;
	return r && t?.areas?.[r] && t.areas[r].name || n;
}
var pt = e((() => {}));
//#endregion
//#region src/common/helpers/entities.js
function mt(e) {
	let t = e.attributes.unit_of_measurement || "", n = e.state;
	return t ? `${n}${t}` : n === "on" || n === "off" ? n.toUpperCase() : n;
}
function ht(e) {
	if (!e) return !1;
	let t = e.entity_id.split(".")[0], n = e.state;
	switch (t) {
		case "cover": return ["open", "opening"].includes(n);
		case "lock": return n === "unlocked";
		case "person": return n === "home";
		case "device_tracker": return n !== "not_home";
		case "climate": return n !== "off";
		case "media_player": return ![
			"off",
			"idle",
			"standby",
			"unavailable"
		].includes(n);
		case "vacuum": return ![
			"docked",
			"idle",
			"off"
		].includes(n);
		case "alarm_control_panel": return n !== "disarmed";
		case "sun": return n === "above_horizon";
		default: return n === "on";
	}
}
var gt = e((() => {}));
//#endregion
//#region src/common/helpers/icons.js
function _t(e, t) {
	let n = this._config.accent_color || "theme";
	return t ? n === "light" ? this._getEntityColor(e) || this._computeFullColor("theme") : this._computeFullColor(n) : this._computeIconColor(n);
}
function vt(e) {
	if (!e) return null;
	let t = e.entity_id?.split(".")[0], n = e.attributes || {};
	if (t === "light") {
		if (Array.isArray(n.rgb_color)) {
			let [e, t, r] = n.rgb_color;
			return `rgb(${e}, ${t}, ${r})`;
		}
		if (Array.isArray(n.hs_color)) {
			let [e, t] = n.hs_color;
			return `hsl(${e}, ${t}%, 50%)`;
		}
	}
	return null;
}
function yt(e) {
	if (!e) return null;
	let t = e.attributes.device_class, n = e.state === "on";
	switch (t) {
		case "door": return n ? "mdi:door-open" : "mdi:door-closed";
		case "window": return n ? "mdi:window-open" : "mdi:window-closed";
		case "garage_door": return n ? "mdi:garage-open" : "mdi:garage";
		case "opening": return n ? "mdi:square-outline" : "mdi:square";
		case "motion":
		case "occupancy": return n ? "mdi:motion-sensor" : "mdi:motion-sensor-off";
		case "presence": return n ? "mdi:account" : "mdi:account-off";
		case "smoke": return n ? "mdi:smoke-detector-alert" : "mdi:smoke-detector";
		case "moisture": return n ? "mdi:water-alert" : "mdi:water-off";
		case "gas": return n ? "mdi:gas-cylinder" : "mdi:gas-cylinder-off";
		case "problem": return n ? "mdi:alert-circle" : "mdi:check-circle";
		case "power": return n ? "mdi:flash" : "mdi:flash-off";
		case "plug": return n ? "mdi:power-plug" : "mdi:power-plug-off";
		case "battery": return n ? "mdi:battery-alert" : "mdi:battery";
		case "connectivity": return n ? "mdi:wifi" : "mdi:wifi-off";
		case "lock": return n ? "mdi:lock-open" : "mdi:lock";
		case "light": return n ? "mdi:lightbulb-on" : "mdi:lightbulb-off";
		default: return n ? "mdi:check-circle" : "mdi:circle-outline";
	}
}
function bt(e, t = null) {
	let n = t ? this._getEntityActiveState(t) : !1;
	switch (e) {
		case "light": return n ? "mdi:lightbulb-on" : "mdi:lightbulb-off";
		case "switch": return t?.attributes?.device_class === "outlet" ? n ? "mdi:power-plug" : "mdi:power-plug-off" : n ? "mdi:toggle-switch-variant" : "mdi:toggle-switch-variant-off";
		case "fan": return n ? "mdi:fan" : "mdi:fan-off";
		case "cover": return n ? "mdi:blinds-open" : "mdi:blinds";
		case "binary_sensor": return this._getBinarySensorIcon(t);
		case "climate": return "mdi:thermostat";
		case "media_player": return "mdi:play-box-multiple";
		case "sensor": return "mdi:gauge";
		case "scene": return "mdi:palette";
		case "script": return "mdi:script-text";
		case "automation": return "mdi:robot";
		case "person": return "mdi:account";
		case "camera": return "mdi:cctv";
		case "vacuum": return "mdi:robot-vacuum";
		default: return "mdi:help-circle";
	}
}
function xt(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".webp") || t.endsWith(".gif");
}
function St(e) {
	return e ? e.startsWith("orbit:") ? Ct(e.slice(6)) : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function Ct(e) {
	let t = import.meta.url.split("?")[0];
	return `${t.slice(0, t.lastIndexOf("/") + 1)}icons/${e}`;
}
function F(e, t = {}) {
	if (!e) return "";
	let n = t.forceColor !== !1, r = `${e}::${n ? "forced" : "auto"}`, i = this.constructor.svgCache, a = i[r];
	return typeof a == "string" && a !== "loading" ? a : a === "loading" ? (Et(r, this), "") : (i[r] = "loading", Et(r, this), Ot(e).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.text();
	}).then((e) => {
		e = Tt(e, n), i[r] = e, Dt(r);
	}).catch((t) => {
		console.error("SVG load failed:", e, t), delete i[r], Dt(r);
	}), "");
}
function wt(e, t) {
	return !e || !t ? !0 : e[`${t}_svg_color_override`] !== !1;
}
function Tt(e, t) {
	let n = e.replace(/width="[^"]*"/gi, "width=\"100%\"").replace(/height="[^"]*"/gi, "height=\"100%\"");
	return t ? n.replace(/fill="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "fill=\"currentColor\"").replace(/stroke="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "stroke=\"currentColor\"").replace(/fill:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "fill:currentColor").replace(/stroke:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "stroke:currentColor") : n;
}
function Et(e, t) {
	t && (I[e] = I[e] || /* @__PURE__ */ new Set(), I[e].add(t));
}
function Dt(e) {
	let t = I[e];
	t && (delete I[e], requestAnimationFrame(() => {
		t.forEach((e) => {
			e.isConnected && e.requestUpdate();
		});
	}));
}
function Ot(e) {
	return fetch(e).then((t) => t.ok ? t : fetch(e, { cache: "reload" }));
}
var I, kt = e((() => {
	I = {};
}));
//#endregion
//#region src/common/helpers/long-press.js
function At(e, t, n) {
	n && (e.stopPropagation(), this._cancelLongPress(), this._longPressTriggered = !1, this._longPressTimer = setTimeout(() => {
		this._longPressTriggered = !0, this._handleAction(n, t);
	}, this._LONG_PRESS_DELAY));
}
function jt() {
	this._longPressTimer &&= (clearTimeout(this._longPressTimer), null);
}
function Mt(e) {
	return this._cancelLongPress(), this._longPressTriggered ? (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), !0) : !1;
}
var Nt = e((() => {}));
//#endregion
//#region src/common/helpers/templates.js
function Pt(e, t) {
	if (!e || !this.hass) return null;
	let n = e;
	try {
		return n = e.replace(/\|\s*float\b/g, "").replace(/\|\s*int\b/g, "").replace(/\|\s*lower\b/g, ".toLowerCase()").replace(/\|\s*upper\b/g, ".toUpperCase()"), Function("states", "state_attr", "is_state", "is_state_attr", "stateObj", "entity", "float", "int", "bool", `
      return (${n});
      `)((e) => this.hass.states[e]?.state ?? "", (e, t) => this.hass.states[e]?.attributes?.[t], (e, t) => this.hass.states[e]?.state === t, (e, t, n) => this.hass.states[e]?.attributes?.[t] === n, (e) => this.hass.states[e] ?? null, this.hass.states[t], (e) => parseFloat(e) || 0, (e) => parseInt(e, 10) || 0, (e) => typeof e == "boolean" ? e : [
			"on",
			"true",
			"yes",
			"home",
			"open",
			"locked"
		].includes(String(e).toLowerCase()));
	} catch (r) {
		return console.error("State template error:", r, {
			template: e,
			processedTemplate: n,
			entityId: t
		}), null;
	}
}
var Ft = e((() => {}));
//#endregion
//#region src/common/helpers/updates.js
function It(e, t, n = {}) {
	if (!e.has("hass") || e.has("_config") || e.has("_collapsed") || [...e.keys()].some((e) => e !== "hass") || n.hasTemplates) return !0;
	let r = e.get("hass"), i = this.hass;
	if (!r || !i) return !0;
	let a = [...new Set(t.filter(Boolean))];
	return !a.length && !n.includeZones ? !1 : a.some((e) => r.states?.[e] !== i.states?.[e]) ? !0 : n.includeZones ? Rt(r, i) : !1;
}
function Lt(e) {
	return Object.keys(e || {}).some((e) => e.endsWith("_template"));
}
function Rt(e, t) {
	return [...new Set([...Object.keys(e.states || {}), ...Object.keys(t.states || {})].filter((e) => e.startsWith("zone.")))].some((n) => e.states?.[n] !== t.states?.[n]);
}
var zt = e((() => {}));
//#endregion
//#region src/common/helpers/suggestions.js
function Bt(e = "") {
	return e.split(".")[0] || "";
}
function Vt(e, t) {
	return e?.entities?.[t]?.area_id || "";
}
function Ht(e, t) {
	let n = e?.states?.[t]?.state;
	return n !== "" && Number.isFinite(Number(n));
}
var Ut = e((() => {})), L, R = e((() => {
	L = {};
}));
//#endregion
//#region src/common/helpers/default-actions.js
function Wt(e, t = "more-info") {
	let n = e?.split(".")[0];
	if (!n) return { action: t };
	let r = Gt[n];
	return r ? {
		action: "call-service",
		service: r,
		service_data: { entity_id: e }
	} : Kt.has(n) ? { action: "toggle" } : { action: t };
}
var Gt, Kt, qt = e((() => {
	Gt = {
		automation: "automation.trigger",
		button: "button.press",
		input_button: "input_button.press",
		scene: "scene.turn_on",
		script: "script.turn_on"
	}, Kt = new Set([
		"alarm_control_panel",
		"climate",
		"cover",
		"fan",
		"humidifier",
		"input_boolean",
		"light",
		"lock",
		"media_player",
		"remote",
		"siren",
		"switch",
		"vacuum",
		"water_heater"
	]);
})), Jt, Yt, Xt, Zt, Qt, $t, en, tn, nn, rn, an, on, sn, cn, ln, un, dn, fn, pn, mn, hn, gn, _n, vn, yn, bn, xn, Sn, Cn, wn, Tn = e((() => {
	Jt = "Area", Yt = "Automations", Xt = "Away", Zt = "Buttons", Qt = "Cameras", $t = "Card", en = "Color", tn = "Disabled", nn = "Enabled", rn = "Entity", an = "Files", on = "Home", sn = "Icon", cn = "Icons", ln = "Mode", un = "Name", dn = "Person", fn = "Picker", pn = "Remove", mn = "Room", hn = "Scenes", gn = "Scripts", _n = "Search", vn = "Security", yn = "Separator", bn = "Standard", xn = "Status", Sn = "Theme", Cn = "Wrap", wn = {
		"Accent Color": "Accent Color",
		"Accent OFF Color": "Accent OFF Color",
		"Accent ON Color": "Accent ON Color",
		"Action Button": "Action Button",
		"Actions Per Row": "Actions Per Row",
		All: "All",
		Area: Jt,
		Automations: Yt,
		Away: Xt,
		"Battery Entity 1": "Battery Entity 1",
		"Battery Entity 2": "Battery Entity 2",
		"Button {index}": "Button {index}",
		Buttons: Zt,
		Cameras: Qt,
		Card: $t,
		"Card Action": "Card Action",
		Color: en,
		"Choose color": "Choose color",
		"Choose icon": "Choose icon",
		"Curve Buttons": "Curve Buttons",
		"Decimal Places": "Decimal Places",
		Disabled: tn,
		Enabled: nn,
		Entity: rn,
		"ETA Entity": "ETA Entity",
		Files: an,
		"Hold Action": "Hold Action",
		Home: on,
		Icon: sn,
		"Icon Only": "Icon Only",
		Icons: cn,
		"Items Per Row": "Items Per Row",
		"Label Template": "Label Template",
		"Loading files...": "Loading files...",
		"Local Icons": "Local Icons",
		"Lock Curve Button Positions": "Lock Curve Button Positions",
		"Main Entity": "Main Entity",
		"Main Entity Action": "Main Entity Action",
		"Main Entity Icon": "Main Entity Icon",
		"Main Entity OFF Icon": "Main Entity OFF Icon",
		"Main Entity ON Icon": "Main Entity ON Icon",
		Mode: ln,
		"Move left": "Move left",
		"Move right": "Move right",
		Name: un,
		"Navigation Path": "Navigation Path",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
		"No matching colors": "No matching colors",
		"No matching files": "No matching files",
		"OFF Color": "OFF Color",
		"OFF Icon": "OFF Icon",
		"ON Color": "ON Color",
		"ON Icon": "ON Icon",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Orbit Icons",
		"Orbit Room Card v{version}": "Orbit Room Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}",
		Person: dn,
		"Person Entity": "Person Entity",
		Picker: fn,
		"Prefix Icon": "Prefix Icon",
		Remove: pn,
		Room: mn,
		"Room Name": "Room Name",
		"Room Navigation Path": "Room Navigation Path",
		Scenes: hn,
		Scripts: gn,
		Search: _n,
		Security: vn,
		"Separate Cards": "Separate Cards",
		Separator: yn,
		Standard: bn,
		"State Light color": "State Light color",
		"State color (default)": "State color (default)",
		"State Template": "State Template",
		Status: xn,
		"Status {index}": "Status {index}",
		"Status Color": "Status Color",
		"Status Name": "Status Name",
		"Status Sensors": "Status Sensors",
		"Tap Action": "Tap Action",
		Theme: Sn,
		"Tracker Entity": "Tracker Entity",
		Wrap: Cn
	};
})), En, Dn, On, kn, An, jn, Mn, Nn, Pn, Fn, In, Ln, Rn, zn, Bn, Vn, Hn, Un, Wn, Gn, Kn, qn, Jn, Yn, Xn, Zn, Qn, $n, er, tr, nr = e((() => {
	En = "Area", Dn = "Automations", On = "Away", kn = "Buttons", An = "Cameras", jn = "Card", Mn = "Colour", Nn = "Disabled", Pn = "Enabled", Fn = "Entity", In = "Files", Ln = "Home", Rn = "Icon", zn = "Icons", Bn = "Mode", Vn = "Name", Hn = "Person", Un = "Picker", Wn = "Remove", Gn = "Room", Kn = "Scenes", qn = "Scripts", Jn = "Search", Yn = "Security", Xn = "Separator", Zn = "Standard", Qn = "Status", $n = "Theme", er = "Wrap", tr = {
		"Accent Color": "Accent Colour",
		"Accent OFF Color": "Accent OFF Colour",
		"Accent ON Color": "Accent ON Colour",
		"Action Button": "Action Button",
		"Actions Per Row": "Actions Per Row",
		All: "All",
		Area: En,
		Automations: Dn,
		Away: On,
		"Battery Entity 1": "Battery Entity 1",
		"Battery Entity 2": "Battery Entity 2",
		"Button {index}": "Button {index}",
		Buttons: kn,
		Cameras: An,
		Card: jn,
		"Card Action": "Card Action",
		Color: Mn,
		"Choose color": "Choose colour",
		"Choose icon": "Choose icon",
		"Curve Buttons": "Curve Buttons",
		"Decimal Places": "Decimal Places",
		Disabled: Nn,
		Enabled: Pn,
		Entity: Fn,
		"ETA Entity": "ETA Entity",
		Files: In,
		"Hold Action": "Hold Action",
		Home: Ln,
		Icon: Rn,
		"Icon Only": "Icon Only",
		Icons: zn,
		"Items Per Row": "Items Per Row",
		"Label Template": "Label Template",
		"Loading files...": "Loading files...",
		"Local Icons": "Local Icons",
		"Lock Curve Button Positions": "Lock Curve Button Positions",
		"Main Entity": "Main Entity",
		"Main Entity Action": "Main Entity Action",
		"Main Entity Icon": "Main Entity Icon",
		"Main Entity OFF Icon": "Main Entity OFF Icon",
		"Main Entity ON Icon": "Main Entity ON Icon",
		Mode: Bn,
		"Move left": "Move left",
		"Move right": "Move right",
		Name: Vn,
		"Navigation Path": "Navigation Path",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
		"No matching colors": "No matching colours",
		"No matching files": "No matching files",
		"OFF Color": "OFF Colour",
		"OFF Icon": "OFF Icon",
		"ON Color": "ON Colour",
		"ON Icon": "ON Icon",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Orbit Icons",
		"Orbit Room Card v{version}": "Orbit Room Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}",
		Person: Hn,
		"Person Entity": "Person Entity",
		Picker: Un,
		"Prefix Icon": "Prefix Icon",
		Remove: Wn,
		Room: Gn,
		"Room Name": "Room Name",
		"Room Navigation Path": "Room Navigation Path",
		Scenes: Kn,
		Scripts: qn,
		Search: Jn,
		Security: Yn,
		"Separate Cards": "Separate Cards",
		Separator: Xn,
		Standard: Zn,
		"State Light color": "State light colour",
		"State color (default)": "State colour (default)",
		"State Template": "State Template",
		Status: Qn,
		"Status {index}": "Status {index}",
		"Status Color": "Status Colour",
		"Status Name": "Status Name",
		"Status Sensors": "Status Sensors",
		"Tap Action": "Tap Action",
		Theme: $n,
		"Tracker Entity": "Tracker Entity",
		Wrap: er
	};
})), rr, ir, ar, or, sr, cr, lr, ur, dr, fr, pr, mr, hr, gr, _r, vr, yr, br, xr, Sr, Cr, wr, Tr, Er, Dr, Or, kr, Ar, jr, Mr, Nr, Pr = e((() => {
	rr = "Alle", ir = "Bereich", ar = "Automatisierungen", or = "Abwesend", sr = "Tasten", cr = "Kameras", lr = "Karte", ur = "Farbe", dr = "Deaktiviert", fr = "Aktiviert", pr = "Entität", mr = "Dateien", hr = "Zuhause", gr = "Symbol", _r = "Symbole", vr = "Modus", yr = "Name", br = "Person", xr = "Auswahl", Sr = "Entfernen", Cr = "Raum", wr = "Szenen", Tr = "Skripte", Er = "Suchen", Dr = "Trennzeichen", Or = "Standard", kr = "Status", Ar = "Theme", jr = "Umbrechen", Mr = "Sicherheit", Nr = {
		"Accent Color": "Akzentfarbe",
		"Accent OFF Color": "Akzentfarbe AUS",
		"Accent ON Color": "Akzentfarbe EIN",
		"Action Button": "Aktionstaste",
		"Actions Per Row": "Aktionen pro Zeile",
		All: rr,
		Area: ir,
		Automations: ar,
		Away: or,
		"Battery Entity 1": "Batterie-Entität 1",
		"Battery Entity 2": "Batterie-Entität 2",
		"Button {index}": "Taste {index}",
		Buttons: sr,
		Cameras: cr,
		Card: lr,
		"Card Action": "Kartenaktion",
		Color: ur,
		"Choose color": "Farbe auswählen",
		"Choose icon": "Symbol auswählen",
		"Curve Buttons": "Bogen-Tasten",
		"Decimal Places": "Dezimalstellen",
		Disabled: dr,
		Enabled: fr,
		Entity: pr,
		"ETA Entity": "ETA-Entität",
		Files: mr,
		"Hold Action": "Halten-Aktion",
		Home: hr,
		Icon: gr,
		"Icon Only": "Nur Symbol",
		Icons: _r,
		"Items Per Row": "Elemente pro Zeile",
		"Label Template": "Beschriftungsvorlage",
		"Loading files...": "Dateien werden geladen...",
		"Local Icons": "Lokale Symbole",
		"Lock Curve Button Positions": "Bogen-Tastenpositionen sperren",
		"Main Entity": "Hauptentität",
		"Main Entity Action": "Hauptentitätsaktion",
		"Main Entity Icon": "Hauptentitätssymbol",
		"Main Entity OFF Icon": "Hauptentität AUS-Symbol",
		"Main Entity ON Icon": "Hauptentität EIN-Symbol",
		Mode: vr,
		"Move left": "Nach links verschieben",
		"Move right": "Nach rechts verschieben",
		Name: yr,
		"Navigation Path": "Navigationspfad",
		"No matching colors": "Keine passenden Farben",
		"No matching files": "Keine passenden Dateien",
		"OFF Color": "AUS-Farbe",
		"OFF Icon": "AUS-Symbol",
		"ON Color": "EIN-Farbe",
		"ON Icon": "EIN-Symbol",
		Person: br,
		"Person Entity": "Personen-Entität",
		Picker: xr,
		"Prefix Icon": "Präfixsymbol",
		Remove: Sr,
		Room: Cr,
		"Room Name": "Raumname",
		"Room Navigation Path": "Raum-Navigationspfad",
		Scenes: wr,
		Scripts: Tr,
		Search: Er,
		"Separate Cards": "Separate Karten",
		Separator: Dr,
		Standard: Or,
		"State Light color": "Lichtstatusfarbe",
		"State color (default)": "Statusfarbe (Standard)",
		"State Template": "Zustandsvorlage",
		Status: kr,
		"Status {index}": "Status {index}",
		"Status Color": "Statusfarbe",
		"Status Name": "Statusname",
		"Status Sensors": "Statussensoren",
		"Tap Action": "Tippen-Aktion",
		Theme: Ar,
		"Tracker Entity": "Tracker-Entität",
		Wrap: jr,
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Keine Dateien gefunden. Füge ein lokales Symbolmanifest unter /local/icons/manifest.json hinzu oder gib den Dateinamen manuell ein.",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Orbit-Symbole",
		"Orbit Room Card v{version}": "Orbit Room Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}",
		Security: Mr
	};
})), Fr, Ir, Lr, Rr, zr, Br, Vr, Hr, Ur, Wr, Gr, Kr, qr, Jr, Yr, Xr, Zr, Qr, $r, ei, ti, ni, ri, ii, ai, oi, si, ci, li, ui, di, fi = e((() => {
	Fr = "Todos", Ir = "Área", Lr = "Automatizaciones", Rr = "Ausente", zr = "Botones", Br = "Cámaras", Vr = "Tarjeta", Hr = "Color", Ur = "Desactivado", Wr = "Activado", Gr = "Entidad", Kr = "Archivos", qr = "En casa", Jr = "Icono", Yr = "Iconos", Xr = "Modo", Zr = "Nombre", Qr = "Persona", $r = "Selector", ei = "Eliminar", ti = "Habitación", ni = "Escenas", ri = "Scripts", ii = "Buscar", ai = "Separador", oi = "Estándar", si = "Estado", ci = "Tema", li = "Ajustar", ui = "Seguridad", di = {
		"Accent Color": "Color de acento",
		"Accent OFF Color": "Color de acento apagado",
		"Accent ON Color": "Color de acento encendido",
		"Action Button": "Botón de acción",
		"Actions Per Row": "Acciones por fila",
		All: Fr,
		Area: Ir,
		Automations: Lr,
		Away: Rr,
		"Battery Entity 1": "Entidad de batería 1",
		"Battery Entity 2": "Entidad de batería 2",
		"Button {index}": "Botón {index}",
		Buttons: zr,
		Cameras: Br,
		Card: Vr,
		"Card Action": "Acción de la tarjeta",
		Color: Hr,
		"Choose color": "Elegir color",
		"Choose icon": "Elegir icono",
		"Curve Buttons": "Botones curvos",
		"Decimal Places": "Decimales",
		Disabled: Ur,
		Enabled: Wr,
		Entity: Gr,
		"ETA Entity": "Entidad ETA",
		Files: Kr,
		"Hold Action": "Acción al mantener",
		Home: qr,
		Icon: Jr,
		"Icon Only": "Solo icono",
		Icons: Yr,
		"Items Per Row": "Elementos por fila",
		"Label Template": "Plantilla de etiqueta",
		"Loading files...": "Cargando archivos...",
		"Local Icons": "Iconos locales",
		"Lock Curve Button Positions": "Bloquear posiciones de botones curvos",
		"Main Entity": "Entidad principal",
		"Main Entity Action": "Acción de entidad principal",
		"Main Entity Icon": "Icono de entidad principal",
		"Main Entity OFF Icon": "Icono apagado de entidad principal",
		"Main Entity ON Icon": "Icono encendido de entidad principal",
		Mode: Xr,
		"Move left": "Mover a la izquierda",
		"Move right": "Mover a la derecha",
		Name: Zr,
		"Navigation Path": "Ruta de navegación",
		"No matching colors": "No hay colores coincidentes",
		"No matching files": "No hay archivos coincidentes",
		"OFF Color": "Color apagado",
		"OFF Icon": "Icono apagado",
		"ON Color": "Color encendido",
		"ON Icon": "Icono encendido",
		Person: Qr,
		"Person Entity": "Entidad de persona",
		Picker: $r,
		"Prefix Icon": "Icono de prefijo",
		Remove: ei,
		Room: ti,
		"Room Name": "Nombre de habitación",
		"Room Navigation Path": "Ruta de navegación de habitación",
		Scenes: ni,
		Scripts: ri,
		Search: ii,
		"Separate Cards": "Tarjetas separadas",
		Separator: ai,
		Standard: oi,
		"State Light color": "Color de luz de estado",
		"State color (default)": "Color de estado (predeterminado)",
		"State Template": "Plantilla de estado",
		Status: si,
		"Status {index}": "Estado {index}",
		"Status Color": "Color de estado",
		"Status Name": "Nombre de estado",
		"Status Sensors": "Sensores de estado",
		"Tap Action": "Acción al tocar",
		Theme: ci,
		"Tracker Entity": "Entidad de seguimiento",
		Wrap: li,
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No se encontraron archivos. Añade un manifiesto de iconos local en /local/icons/manifest.json o escribe el nombre del archivo manualmente.",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Iconos de Orbit",
		"Orbit Room Card v{version}": "Orbit Room Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}",
		Security: ui
	};
})), pi, mi, hi, gi, _i, vi, yi, bi, xi, Si, Ci, wi, Ti, Ei, Di, Oi, ki, Ai, ji, Mi, Ni, Pi, Fi, Ii, Li, Ri, zi, Bi, Vi, Hi, Ui = e((() => {
	pi = "Toutes", mi = "Zone", hi = "Automatisations", gi = "Absent", _i = "Boutons", vi = "Caméras", yi = "Carte", bi = "Couleur", xi = "Désactivé", Si = "Activé", Ci = "Entité", wi = "Fichiers", Ti = "À la maison", Ei = "Icône", Di = "Icônes", Oi = "Mode", ki = "Personne", Ai = "Sélecteur", ji = "Supprimer", Mi = "Pièce", Ni = "Scènes", Pi = "Scripts", Fi = "Rechercher", Ii = "Séparateur", Li = "Standard", Ri = "Statut", zi = "Thème", Bi = "Retour à la ligne", Vi = "Sécurité", Hi = {
		"Accent Color": "Couleur d'accent",
		"Accent OFF Color": "Couleur d'accent OFF",
		"Accent ON Color": "Couleur d'accent ON",
		"Action Button": "Bouton d'action",
		"Actions Per Row": "Actions par ligne",
		All: pi,
		Area: mi,
		Automations: hi,
		Away: gi,
		"Battery Entity 1": "Entité batterie 1",
		"Battery Entity 2": "Entité batterie 2",
		"Button {index}": "Bouton {index}",
		Buttons: _i,
		Cameras: vi,
		Card: yi,
		"Card Action": "Action de la carte",
		Color: bi,
		"Choose color": "Choisir une couleur",
		"Choose icon": "Choisir une icône",
		"Curve Buttons": "Boutons courbes",
		"Decimal Places": "Décimales",
		Disabled: xi,
		Enabled: Si,
		Entity: Ci,
		"ETA Entity": "Entité ETA",
		Files: wi,
		"Hold Action": "Action d'appui long",
		Home: Ti,
		Icon: Ei,
		"Icon Only": "Icône seule",
		Icons: Di,
		"Items Per Row": "Éléments par ligne",
		"Label Template": "Modèle de libellé",
		"Loading files...": "Chargement des fichiers...",
		"Local Icons": "Icônes locales",
		"Lock Curve Button Positions": "Verrouiller les positions des boutons courbes",
		"Main Entity": "Entité principale",
		"Main Entity Action": "Action de l'entité principale",
		"Main Entity Icon": "Icône de l'entité principale",
		"Main Entity OFF Icon": "Icône OFF de l'entité principale",
		"Main Entity ON Icon": "Icône ON de l'entité principale",
		Mode: Oi,
		"Move left": "Déplacer à gauche",
		"Move right": "Déplacer à droite",
		Name: "Nom",
		"Navigation Path": "Chemin de navigation",
		"No matching colors": "Aucune couleur correspondante",
		"No matching files": "Aucun fichier correspondant",
		"OFF Color": "Couleur OFF",
		"OFF Icon": "Icône OFF",
		"ON Color": "Couleur ON",
		"ON Icon": "Icône ON",
		Person: ki,
		"Person Entity": "Entité personne",
		Picker: Ai,
		"Prefix Icon": "Icône de préfixe",
		Remove: ji,
		Room: Mi,
		"Room Name": "Nom de la pièce",
		"Room Navigation Path": "Chemin de navigation de la pièce",
		Scenes: Ni,
		Scripts: Pi,
		Search: Fi,
		"Separate Cards": "Cartes séparées",
		Separator: Ii,
		Standard: Li,
		"State Light color": "Couleur d’état de lumière",
		"State color (default)": "Couleur d’état (par défaut)",
		"State Template": "Modèle d'état",
		Status: Ri,
		"Status {index}": "Statut {index}",
		"Status Color": "Couleur du statut",
		"Status Name": "Nom du statut",
		"Status Sensors": "Capteurs de statut",
		"Tap Action": "Action au toucher",
		Theme: zi,
		"Tracker Entity": "Entité de suivi",
		Wrap: Bi,
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Aucun fichier trouvé. Ajoutez un manifeste d’icônes local dans /local/icons/manifest.json ou saisissez le nom du fichier manuellement.",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Icônes Orbit",
		"Orbit Room Card v{version}": "Orbit Room Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}",
		Security: Vi
	};
})), Wi, Gi, Ki, qi, Ji, Yi, Xi, Zi, Qi, $i, ea, ta, na, ra, ia, aa, oa, sa, ca, la, ua, da, fa, pa, ma, ha, ga, _a, va, ya, ba, xa = e((() => {
	Wi = "Tutto", Gi = "Area", Ki = "Automazioni", qi = "Assente", Ji = "Pulsanti", Yi = "Telecamere", Xi = "Scheda", Zi = "Colore", Qi = "Disabilitato", $i = "Abilitato", ea = "Entità", ta = "File", na = "A casa", ra = "Icona", ia = "Icone", aa = "Modalità", oa = "Nome", sa = "Persona", ca = "Selettore", la = "Rimuovi", ua = "Stanza", da = "Scene", fa = "Script", pa = "Cerca", ma = "Separatore", ha = "Standard", ga = "Stato", _a = "Tema", va = "A capo", ya = "Sicurezza", ba = {
		"Accent Color": "Colore accento",
		"Accent OFF Color": "Colore accento OFF",
		"Accent ON Color": "Colore accento ON",
		"Action Button": "Pulsante azione",
		"Actions Per Row": "Azioni per riga",
		All: Wi,
		Area: Gi,
		Automations: Ki,
		Away: qi,
		"Battery Entity 1": "Entità batteria 1",
		"Battery Entity 2": "Entità batteria 2",
		"Button {index}": "Pulsante {index}",
		Buttons: Ji,
		Cameras: Yi,
		Card: Xi,
		"Card Action": "Azione scheda",
		Color: Zi,
		"Choose color": "Scegli colore",
		"Choose icon": "Scegli icona",
		"Curve Buttons": "Pulsanti curvi",
		"Decimal Places": "Decimali",
		Disabled: Qi,
		Enabled: $i,
		Entity: ea,
		"ETA Entity": "Entità ETA",
		Files: ta,
		"Hold Action": "Azione pressione lunga",
		Home: na,
		Icon: ra,
		"Icon Only": "Solo icona",
		Icons: ia,
		"Items Per Row": "Elementi per riga",
		"Label Template": "Template etichetta",
		"Loading files...": "Caricamento file...",
		"Local Icons": "Icone locali",
		"Lock Curve Button Positions": "Blocca posizioni dei pulsanti curvi",
		"Main Entity": "Entità principale",
		"Main Entity Action": "Azione entità principale",
		"Main Entity Icon": "Icona entità principale",
		"Main Entity OFF Icon": "Icona OFF entità principale",
		"Main Entity ON Icon": "Icona ON entità principale",
		Mode: aa,
		"Move left": "Sposta a sinistra",
		"Move right": "Sposta a destra",
		Name: oa,
		"Navigation Path": "Percorso navigazione",
		"No matching colors": "Nessun colore corrispondente",
		"No matching files": "Nessun file corrispondente",
		"OFF Color": "Colore OFF",
		"OFF Icon": "Icona OFF",
		"ON Color": "Colore ON",
		"ON Icon": "Icona ON",
		Person: sa,
		"Person Entity": "Entità persona",
		Picker: ca,
		"Prefix Icon": "Icona prefisso",
		Remove: la,
		Room: ua,
		"Room Name": "Nome stanza",
		"Room Navigation Path": "Percorso navigazione stanza",
		Scenes: da,
		Scripts: fa,
		Search: pa,
		"Separate Cards": "Schede separate",
		Separator: ma,
		Standard: ha,
		"State Light color": "Colore stato luce",
		"State color (default)": "Colore stato (predefinito)",
		"State Template": "Template stato",
		Status: ga,
		"Status {index}": "Stato {index}",
		"Status Color": "Colore stato",
		"Status Name": "Nome stato",
		"Status Sensors": "Sensori stato",
		"Tap Action": "Azione tocco",
		Theme: _a,
		"Tracker Entity": "Entità tracker",
		Wrap: va,
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Nessun file trovato. Aggiungi un manifesto icone locale in /local/icons/manifest.json oppure digita manualmente il nome del file.",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Icone Orbit",
		"Orbit Room Card v{version}": "Orbit Room Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}",
		Security: ya
	};
})), Sa, Ca, wa, Ta, Ea, Da, Oa, ka, Aa, ja, Ma, Na, Pa, Fa, Ia, La, Ra, za, Ba, Va, Ha, Ua, Wa, Ga, Ka, qa, Ja, Ya, Xa, Za, Qa, $a = e((() => {
	Sa = "Alles", Ca = "Gebied", wa = "Automatiseringen", Ta = "Afwezig", Ea = "Knoppen", Da = "Camera's", Oa = "Kaart", ka = "Kleur", Aa = "Uitgeschakeld", ja = "Ingeschakeld", Ma = "Entiteit", Na = "Bestanden", Pa = "Thuis", Fa = "Icoon", Ia = "Iconen", La = "Modus", Ra = "Naam", za = "Persoon", Ba = "Kiezer", Va = "Verwijderen", Ha = "Ruimte", Ua = "Scènes", Wa = "Scripts", Ga = "Zoeken", Ka = "Scheidingsteken", qa = "Standaard", Ja = "Status", Ya = "Thema", Xa = "Teruglopen", Za = "Beveiliging", Qa = {
		"Accent Color": "Accentkleur",
		"Accent OFF Color": "Accentkleur UIT",
		"Accent ON Color": "Accentkleur AAN",
		"Action Button": "Actieknop",
		"Actions Per Row": "Acties per rij",
		All: Sa,
		Area: Ca,
		Automations: wa,
		Away: Ta,
		"Battery Entity 1": "Batterij-entiteit 1",
		"Battery Entity 2": "Batterij-entiteit 2",
		"Button {index}": "Knop {index}",
		Buttons: Ea,
		Cameras: Da,
		Card: Oa,
		"Card Action": "Kaartactie",
		Color: ka,
		"Choose color": "Kleur kiezen",
		"Choose icon": "Icoon kiezen",
		"Curve Buttons": "Gebogen knoppen",
		"Decimal Places": "Decimalen",
		Disabled: Aa,
		Enabled: ja,
		Entity: Ma,
		"ETA Entity": "ETA-entiteit",
		Files: Na,
		"Hold Action": "Vasthoudactie",
		Home: Pa,
		Icon: Fa,
		"Icon Only": "Alleen icoon",
		Icons: Ia,
		"Items Per Row": "Items per rij",
		"Label Template": "Labelsjabloon",
		"Loading files...": "Bestanden laden...",
		"Local Icons": "Lokale iconen",
		"Lock Curve Button Positions": "Posities van gebogen knoppen vergrendelen",
		"Main Entity": "Hoofdentiteit",
		"Main Entity Action": "Actie hoofdentiteit",
		"Main Entity Icon": "Icoon hoofdentiteit",
		"Main Entity OFF Icon": "UIT-icoon hoofdentiteit",
		"Main Entity ON Icon": "AAN-icoon hoofdentiteit",
		Mode: La,
		"Move left": "Naar links verplaatsen",
		"Move right": "Naar rechts verplaatsen",
		Name: Ra,
		"Navigation Path": "Navigatiepad",
		"No matching colors": "Geen overeenkomende kleuren",
		"No matching files": "Geen overeenkomende bestanden",
		"OFF Color": "UIT-kleur",
		"OFF Icon": "UIT-icoon",
		"ON Color": "AAN-kleur",
		"ON Icon": "AAN-icoon",
		Person: za,
		"Person Entity": "Persoon-entiteit",
		Picker: Ba,
		"Prefix Icon": "Prefix-icoon",
		Remove: Va,
		Room: Ha,
		"Room Name": "Ruimtenaam",
		"Room Navigation Path": "Navigatiepad ruimte",
		Scenes: Ua,
		Scripts: Wa,
		Search: Ga,
		"Separate Cards": "Aparte kaarten",
		Separator: Ka,
		Standard: qa,
		"State Light color": "Statuskleur licht",
		"State color (default)": "Statuskleur (standaard)",
		"State Template": "Statussjabloon",
		Status: Ja,
		"Status {index}": "Status {index}",
		"Status Color": "Statuskleur",
		"Status Name": "Statusnaam",
		"Status Sensors": "Statussensoren",
		"Tap Action": "Tikactie",
		Theme: Ya,
		"Tracker Entity": "Tracker-entiteit",
		Wrap: Xa,
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Geen bestanden gevonden. Voeg een lokaal iconenmanifest toe op /local/icons/manifest.json of typ de bestandsnaam handmatig.",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Orbit-iconen",
		"Orbit Room Card v{version}": "Orbit Room Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}",
		Security: Za
	};
})), eo, to, no, ro, io, ao, oo, so, co, lo, uo, fo, po, mo, ho, go, _o, vo, yo, bo, xo, So, Co, wo, To, Eo, Do, Oo, ko, Ao, jo = e((() => {
	eo = "Todos", to = "Área", no = "Automações", ro = "Ausente", io = "Botões", ao = "Câmeras", oo = "Cartão", so = "Desativado", co = "Ativado", lo = "Entidade", uo = "Arquivos", fo = "Em casa", po = "Ícone", mo = "Ícones", ho = "Modo", go = "Nome", _o = "Pessoa", vo = "Seletor", yo = "Remover", bo = "Cômodo", xo = "Cenas", So = "Scripts", Co = "Pesquisar", wo = "Separador", To = "Padrão", Eo = "Status", Do = "Tema", Oo = "Quebrar linha", ko = "Segurança", Ao = {
		"Accent Color": "Cor de destaque",
		"Accent OFF Color": "Cor de destaque desligado",
		"Accent ON Color": "Cor de destaque ligado",
		"Action Button": "Botão de ação",
		"Actions Per Row": "Ações por linha",
		All: eo,
		Area: to,
		Automations: no,
		Away: ro,
		"Battery Entity 1": "Entidade de bateria 1",
		"Battery Entity 2": "Entidade de bateria 2",
		"Button {index}": "Botão {index}",
		Buttons: io,
		Cameras: ao,
		Card: oo,
		"Card Action": "Ação do cartão",
		Color: "Cor",
		"Choose color": "Escolher cor",
		"Choose icon": "Escolher ícone",
		"Curve Buttons": "Botões curvos",
		"Decimal Places": "Casas decimais",
		Disabled: so,
		Enabled: co,
		Entity: lo,
		"ETA Entity": "Entidade ETA",
		Files: uo,
		"Hold Action": "Ação ao segurar",
		Home: fo,
		Icon: po,
		"Icon Only": "Somente ícone",
		Icons: mo,
		"Items Per Row": "Itens por linha",
		"Label Template": "Modelo de rótulo",
		"Loading files...": "Carregando arquivos...",
		"Local Icons": "Ícones locais",
		"Lock Curve Button Positions": "Bloquear posições dos botões curvos",
		"Main Entity": "Entidade principal",
		"Main Entity Action": "Ação da entidade principal",
		"Main Entity Icon": "Ícone da entidade principal",
		"Main Entity OFF Icon": "Ícone desligado da entidade principal",
		"Main Entity ON Icon": "Ícone ligado da entidade principal",
		Mode: ho,
		"Move left": "Mover para a esquerda",
		"Move right": "Mover para a direita",
		Name: go,
		"Navigation Path": "Caminho de navegação",
		"No matching colors": "Nenhuma cor correspondente",
		"No matching files": "Nenhum arquivo correspondente",
		"OFF Color": "Cor desligado",
		"OFF Icon": "Ícone desligado",
		"ON Color": "Cor ligado",
		"ON Icon": "Ícone ligado",
		Person: _o,
		"Person Entity": "Entidade de pessoa",
		Picker: vo,
		"Prefix Icon": "Ícone de prefixo",
		Remove: yo,
		Room: bo,
		"Room Name": "Nome do cômodo",
		"Room Navigation Path": "Caminho de navegação do cômodo",
		Scenes: xo,
		Scripts: So,
		Search: Co,
		"Separate Cards": "Cartões separados",
		Separator: wo,
		Standard: To,
		"State Light color": "Cor de estado da luz",
		"State color (default)": "Cor de estado (padrão)",
		"State Template": "Modelo de estado",
		Status: Eo,
		"Status {index}": "Status {index}",
		"Status Color": "Cor do status",
		"Status Name": "Nome do status",
		"Status Sensors": "Sensores de status",
		"Tap Action": "Ação ao tocar",
		Theme: Do,
		"Tracker Entity": "Entidade de rastreamento",
		Wrap: Oo,
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Nenhum arquivo encontrado. Adicione um manifesto de ícones local em /local/icons/manifest.json ou digite o nome do arquivo manualmente.",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Ícones Orbit",
		"Orbit Room Card v{version}": "Orbit Room Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}",
		Security: ko
	};
}));
//#endregion
//#region src/common/localize.js
function z(e, t, n = {}) {
	let r = No(e), i = r.replace("_", "-"), a = r.split("-")[0], o = Mo(r, t) || Mo(i, t) || Mo(a, t) || Po.en[t] || t;
	return Object.entries(n).reduce((e, [t, n]) => e.replaceAll(`{${t}}`, n ?? ""), o);
}
function Mo(e, t) {
	let n = Po[e]?.[t];
	return n === "" ? null : n;
}
function No(e) {
	return (e?.locale?.language || e?.language || "en").toLowerCase();
}
var Po, B = e((() => {
	Tn(), nr(), Pr(), fi(), Ui(), xa(), $a(), jo(), Po = {
		de: Nr,
		en: wn,
		"en-gb": tr,
		en_gb: tr,
		es: di,
		fr: Hi,
		it: ba,
		nl: Qa,
		"pt-br": Ao,
		pt_br: Ao
	};
}));
//#endregion
//#region src/cards/room/helpers/lifecycle.js
function Fo(e) {
	if (!e.has("_config") && !e.has("hass")) return;
	this._cardName = this._getCardName(z(this.hass, "Room"));
	let t = this._config.main_entity || this._config.entity, n = this._config.area, r = t && this.hass ? this.hass.states[t] : null, i = r ? this._getEntityActiveState(r) : !1;
	this._iconColor = this._getMainIconColor(r, i);
	let a = this._config.main_entity_icon, o = this._config.main_entity_icon_on, s = this._config.main_entity_icon_off, c = "mdi:sofa";
	r ? c = r.attributes?.icon || this._getDefaultDomainIcon(r.entity_id.split(".")[0], r) || "mdi:sofa" : n && this.hass?.areas?.[n] && (c = this.hass.areas[n].icon || "mdi:sofa");
	let l = i && o ? "main_entity_icon_on" : !i && s ? "main_entity_icon_off" : a ? "main_entity_icon" : "";
	this._icon = (i ? o : s) || a || c, this._iconSvgForceColor = l ? this._getSvgColorOverride(l) : !0, this._statusItems = Io.call(this), this._buttonModels = zo.call(this), this._curveButtonModels = Bo.call(this), this._actionButtonModel = Vo.call(this);
}
function Io() {
	return [
		1,
		2,
		3
	].map((e) => {
		let t = this._config[`status${e}`];
		if (!t) return null;
		let n = this.hass?.states[t], r = this._config[`status${e}_icon`] || "";
		return {
			entityId: t,
			text: Ro.call(this, n, this._config[`status${e}_decimal_places`]),
			icon: r,
			iconPath: this._isImageIcon(r) ? this._resolveIconPath(r) : "",
			isImage: this._isImageIcon(r),
			isHaIcon: Lo(r)
		};
	}).filter(Boolean);
}
function Lo(e) {
	return /^[a-z0-9_-]+:/i.test(e || "");
}
function Ro(e, t) {
	if (!e) return "—";
	if (t === void 0 || t === "") return this.formatState(e);
	let n = Number(t), r = Number(e.state);
	if (!Number.isFinite(n) || !Number.isFinite(r)) return this.formatState(e);
	let i = e.attributes.unit_of_measurement || "";
	return `${r.toFixed(Math.max(0, n))}${i}`;
}
function zo() {
	return [
		this._config.button1,
		this._config.button2,
		this._config.button3,
		this._config.button4
	].filter(Boolean).map((e, t) => Ho.call(this, "button", e, t, {
		defaultAction: { action: "toggle" },
		defaultHoldAction: { action: "more-info" },
		getIconColor: Ko,
		getBackgroundColor: Go
	})).filter(Boolean);
}
function Bo() {
	let e = this._config?.curve_buttons_lock_position ?? !1, t = [
		this._config.curve_button1,
		this._config.curve_button2,
		this._config.curve_button3,
		this._config.curve_button4,
		this._config.curve_button5,
		this._config.curve_button6
	], n = t.filter(Boolean);
	return t.map((t, r) => {
		if (!e && !t) return null;
		if (e && !t) return {
			empty: !0,
			position: r
		};
		let i = Ho.call(this, "curve_button", t, r, {
			defaultAction: { action: "more-info" },
			defaultHoldAction: null,
			getIconColor: Jo,
			getBackgroundColor: null
		});
		return i ? (i.position = e ? r : n.indexOf(t), i) : null;
	}).filter(Boolean);
}
function Vo() {
	let e = this._config.action_button;
	return e ? Ho.call(this, "action_button", e, 0, {
		key: "action_button",
		defaultAction: Wt(e),
		defaultHoldAction: null,
		getIconColor: Yo,
		getBackgroundColor: null
	}) : null;
}
function Ho(e, t, n, r) {
	let i = this.hass?.states[t];
	if (!i) return null;
	let a = r.key || `${e}${n + 1}`, o = this._config?.[`${a}_state_template`], s = this._evaluateStateTemplate(o, t), c = s == null ? this._getEntityActiveState(i) : s === !0 || s === "on", l = Wo.call(this, a, t, i, c), u = this._isImageIcon(l);
	return {
		entityId: t,
		holdAction: this._config?.[`${a}_hold_action`] || r.defaultHoldAction,
		tapAction: this._config?.[`${a}_tap_action`] || r.defaultAction,
		backgroundColor: r.getBackgroundColor ? r.getBackgroundColor.call(this, a, i, c) : "",
		icon: l,
		iconColor: r.getIconColor.call(this, a, i, c),
		iconPath: u ? this._resolveIconPath(l) : "",
		svgForceColor: Uo.call(this, a, c),
		isImage: u
	};
}
function Uo(e, t) {
	let n = this._config?.[`${e}_icon`], r = t && this._config?.[`${e}_icon_on`] ? `${e}_icon_on` : !t && this._config?.[`${e}_icon_off`] ? `${e}_icon_off` : n ? `${e}_icon` : "";
	return r ? this._getSvgColorOverride(r) : !0;
}
function Wo(e, t, n, r) {
	let i = this._config?.[`${e}_icon`], a = this._config?.[`${e}_icon_on`], o = this._config?.[`${e}_icon_off`], s = t.split(".")[0], c = this._getDefaultDomainIcon(s, n), l = n?.attributes?.icon || this.hass?.entities?.[t]?.icon;
	return (r ? a : o) || i || l || c || "mdi:help-circle";
}
function Go(e, t, n) {
	if (n) return this._computeButtonBackground(qo.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return N(r) ? `color-mix(in srgb, transparent, ${r} 90%)` : !r || r === "theme" ? "rgba(var(--color-theme),0.05)" : M(r, 10);
}
function Ko(e, t, n) {
	if (n) return this._computeFullColor(qo.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return r.startsWith("rgba(") ? r : N(r) ? `color-mix(in srgb, transparent, ${r} 80%)` : M(r, 20);
}
function qo(e, t) {
	let n = this._config[`${e}_on_color`] || "theme";
	return n === "light" ? this._getEntityColor(t) || this._config.accent_color || "theme" : n;
}
function Jo(e, t, n) {
	let r = this._config.accent_color || "theme";
	return r === "theme" ? n ? "rgba(var(--color-theme),0.7)" : "rgba(var(--color-theme),0.2)" : N(r) ? n ? r : `color-mix(in srgb, ${r} 40%, transparent)` : n ? this._computeFullColor(r) : M(r, 40);
}
function Yo(e, t, n) {
	let r = n ? this._config[`${e}_on_color`] : this._config[`${e}_off_color`];
	return r && r !== "theme" ? Ko.call(this, e, t, n) : Jo.call(this, e, t, n);
}
var Xo = e((() => {
	P(), qt(), B();
})), Zo, Qo, $o, es = e((() => {
	Zo = {
		ATTRIBUTE: 1,
		CHILD: 2,
		PROPERTY: 3,
		BOOLEAN_ATTRIBUTE: 4,
		EVENT: 5,
		ELEMENT: 6
	}, Qo = (e) => (...t) => ({
		_$litDirective$: e,
		values: t
	}), $o = class {
		constructor(e) {}
		get _$AU() {
			return this._$AM._$AU;
		}
		_$AT(e, t, n) {
			this._$Ct = e, this._$AM = t, this._$Ci = n;
		}
		_$AS(e, t) {
			return this.update(e, t);
		}
		update(e, t) {
			return this.render(...t);
		}
	};
})), ts, V, ns = e((() => {
	k(), es(), ts = class extends $o {
		constructor(e) {
			if (super(e), this.it = E, e.type !== Zo.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
		}
		render(e) {
			if (e === E || e == null) return this._t = void 0, this.it = e;
			if (e === T) return e;
			if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
			if (e === this.it) return this._t;
			this.it = e;
			let t = [e];
			return t.raw = t, this._t = {
				_$litType$: this.constructor.resultType,
				strings: t,
				values: []
			};
		}
	}, ts.directiveName = "unsafeHTML", ts.resultType = 1, V = Qo(ts);
})), H = e((() => {
	ns();
}));
//#endregion
//#region src/cards/room/renders/buttons.js
function rs(e) {
	return e ? w`
      <button
        class="entity-button"
        style="background:${e.backgroundColor};"
        @click=${this._handleButtonClick}

        @pointerdown=${this._handleButtonPointerDown}

        @pointerup=${this._finishLongPress}
        @pointerleave=${this._cancelLongPress}
        @pointercancel=${this._cancelLongPress}

        .dataEntity=${e.entityId}
        .dataAction=${e.tapAction}
        .dataHoldAction=${e.holdAction}
      >
        ${e.isImage ? w`
              <div
                class="button-image-icon"
                style="color:${e.iconColor};"
              >
                ${e.iconPath ? V(this._getInlineSvg(e.iconPath, e.svgForceColor)) : ""}
              </div>
            ` : w`
              <ha-icon
                .icon=${e.icon}
                style="color:${e.iconColor};"
              ></ha-icon>
            `}
      </button>
    ` : null;
}
var is = e((() => {
	j(), H();
}));
//#endregion
//#region src/cards/room/renders/room-card.js
function as() {
	let e = this._buttonModels || [], t = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", n = t ? this._getInlineSvg(t, this._iconSvgForceColor) : "";
	return w`
    <ha-card tabindex="0" @click=${this._handleTap}>
      <div class="container">
        <div class="content">

            <div class="header ${e.length >= 3 ? "compressed" : ""}">
              <div class="card-name" style="color:${this._roomColor}">
                ${this._cardName}
            </div>

            <div class="status" style="color:${this._statusColor}">
              ${os.call(this)}
            </div>
          </div>

          ${e.length ? w`
                <div class="button-column" style="--button-count:${e.length}">
                  ${e.map((e) => this._renderButtons(e))}
                </div>
              ` : ""}

        </div>

        <div
          class="circle"
          style="background:${this._circleColor}"

          @click=${this._handleMainEntityTap}

          @pointerdown=${this._handleMainEntityPointerDown}

          @pointerup=${this._finishLongPress}
          @pointerleave=${this._cancelLongPress}
          @pointercancel=${this._cancelLongPress}
        >

          ${this._renderCurveButtons()}

          ${this._isImageIcon(this._icon) ? w`
                <div
                  class="main-image-icon"
                  style="color:${this._iconColor};"
                >
                  ${n ? V(n) : w`<img src=${t} alt="" />`}
                </div>
              ` : w`
                <ha-icon
                  class="main-icon"
                  .icon=${this._icon}
                  style="color:${this._iconColor}"
                ></ha-icon>
              `}

        </div>

      </div>
    </ha-card>
  `;
}
function os() {
	let e = this._statusItems || [];
	if (!e.length) return this._statusText || "";
	let t = this._config?.status_separator || "|";
	return e.map((e, n) => w`
    ${n > 0 ? w`
          <span class="status-separator">
            ${t}
          </span>
        ` : ""}
    <span class="status-item">
      ${ss.call(this, e)}
      <span>${e.text}</span>
    </span>
  `);
}
function ss(e) {
	return e.icon ? e.isImage ? w`
      <span class="status-prefix-icon status-prefix-image">
        ${e.iconPath ? V(this._getInlineSvg(e.iconPath, !0)) : ""}
      </span>
    ` : e.isHaIcon ? w`
      <ha-icon
        class="status-prefix-icon"
        .icon=${e.icon}
      ></ha-icon>
    ` : w`
    <span class="status-prefix-text">
      ${e.icon}
    </span>
  ` : "";
}
var cs = e((() => {
	j(), H();
})), ls, us, ds, U, W, fs, ps, ms, hs, gs = e((() => {
	k(), {I: ls} = Le, us = (e) => e, ds = () => document.createComment(""), U = (e, t, n) => {
		let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
		if (n === void 0) n = new ls(r.insertBefore(ds(), i), r.insertBefore(ds(), i), e, e.options);
		else {
			let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
			if (o) {
				let t;
				n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
			}
			if (t !== i || o) {
				let e = n._$AA;
				for (; e !== t;) {
					let t = us(e).nextSibling;
					us(r).insertBefore(e, i), e = t;
				}
			}
		}
		return n;
	}, W = (e, t, n = e) => (e._$AI(t, n), e), fs = {}, ps = (e, t = fs) => e._$AH = t, ms = (e) => e._$AH, hs = (e) => {
		e._$AR(), e._$AA.remove();
	};
})), _s, vs, ys = e((() => {
	k(), es(), gs(), _s = (e, t, n) => {
		let r = /* @__PURE__ */ new Map();
		for (let i = t; i <= n; i++) r.set(e[i], i);
		return r;
	}, vs = Qo(class extends $o {
		constructor(e) {
			if (super(e), e.type !== Zo.CHILD) throw Error("repeat() can only be used in text expressions");
		}
		dt(e, t, n) {
			let r;
			n === void 0 ? n = t : t !== void 0 && (r = t);
			let i = [], a = [], o = 0;
			for (let t of e) i[o] = r ? r(t, o) : o, a[o] = n(t, o), o++;
			return {
				values: a,
				keys: i
			};
		}
		render(e, t, n) {
			return this.dt(e, t, n).values;
		}
		update(e, [t, n, r]) {
			let i = ms(e), { values: a, keys: o } = this.dt(t, n, r);
			if (!Array.isArray(i)) return this.ut = o, a;
			let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
			for (; d <= f && p <= m;) if (i[d] === null) d++;
			else if (i[f] === null) f--;
			else if (s[d] === o[p]) c[p] = W(i[d], a[p]), d++, p++;
			else if (s[f] === o[m]) c[m] = W(i[f], a[m]), f--, m--;
			else if (s[d] === o[m]) c[m] = W(i[d], a[m]), U(e, c[m + 1], i[d]), d++, m--;
			else if (s[f] === o[p]) c[p] = W(i[f], a[p]), U(e, i[d], i[f]), f--, p++;
			else if (l === void 0 && (l = _s(o, p, m), u = _s(s, d, f)), l.has(s[d])) if (l.has(s[f])) {
				let t = u.get(o[p]), n = t === void 0 ? null : i[t];
				if (n === null) {
					let t = U(e, i[d]);
					W(t, a[p]), c[p] = t;
				} else c[p] = W(n, a[p]), U(e, i[d], n), i[t] = null;
				p++;
			} else hs(i[f]), f--;
			else hs(i[d]), d++;
			for (; p <= m;) {
				let t = U(e, c[m + 1]);
				W(t, a[p]), c[p++] = t;
			}
			for (; d <= f;) {
				let e = i[d++];
				e !== null && hs(e);
			}
			return this.ut = o, ps(e, c), T;
		}
	});
})), bs = e((() => {
	ys();
}));
//#endregion
//#region src/cards/room/renders/curve-buttons.js
function xs() {
	let e = this._curveButtonModels || [], t = this._actionButtonModel;
	return w`
      <div class="curve-buttons">

        ${vs(e, (e, t) => t, (e) => e.empty ? w`
              <div class="curve-button pos-${e.position}"></div>
            ` : w`
            <button
              class="curve-button pos-${e.position}"
                @click=${this._handleCurveButtonClick}
                @pointerdown=${this._handleButtonPointerDown}

                @pointerup=${this._finishLongPress}
                @pointerleave=${this._cancelLongPress}
                @pointercancel=${this._cancelLongPress}

                .dataEntity=${e.entityId}
                .dataAction=${e.tapAction}
                .dataHoldAction=${e.holdAction}
            >
              ${e.isImage ? w`
                    <div
                      class="curve-image-icon"
                      style="color:${e.iconColor};"
                    >
                      ${V(this._getInlineSvg(e.iconPath, e.svgForceColor))}
                    </div>
                  ` : w`
                    <ha-icon
                      .icon=${e.icon}
                      style="color:${e.iconColor};"
                    ></ha-icon>
                  `}
            </button>
          `)}

      ${t ? Ss.call(this, t) : ""}

      </div>
    `;
}
function Ss(e) {
	return w`
    <button
      class="curve-button action-button"
        @click=${this._handleCurveButtonClick}
        @pointerdown=${this._handleButtonPointerDown}

        @pointerup=${this._finishLongPress}
        @pointerleave=${this._cancelLongPress}
        @pointercancel=${this._cancelLongPress}

        .dataEntity=${e.entityId}
        .dataAction=${e.tapAction}
        .dataHoldAction=${e.holdAction}
    >
      ${e.isImage ? w`
            <div
              class="curve-image-icon"
              style="color:${e.iconColor};"
            >
              ${V(this._getInlineSvg(e.iconPath, e.svgForceColor))}
            </div>
          ` : w`
            <ha-icon
              .icon=${e.icon}
              style="color:${e.iconColor};"
            ></ha-icon>
          `}
    </button>
  `;
}
var Cs = e((() => {
	j(), bs(), H();
})), ws, Ts = e((() => {
	j(), ws = c`
  .header {
    width: 100%;
  }

  .card-name {
    font-size: clamp(18px, 9cqw, 34px);
    font-weight: bold;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .status {
    font-size: clamp(13px, 6.7cqw, 26px);
    font-weight: bold;
    opacity: 0.4;
    line-height: 1.1;
    margin-top: clamp(6px, 1.8cqw, 28px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
})), Es, Ds = e((() => {
	j(), Es = c`
  :host {
    display: block;
  }

  ha-card {
    background: var(--card-background-color, #1a1a1a);
    border-radius: 18px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s ease;
    container-type: size;
  }

  ha-card:active {
    transform: scale(0.98);
  }

  .container {
    padding: clamp(14px, 2cqw, 24px);
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }

  .content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;
})), Os, ks = e((() => {
	j(), Os = c`
  .main-icon {
    --mdc-icon-size: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .main-image-icon {
    width: 45%;
    height: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    user-select: none;
    position: relative;
  }

  .main-image-icon svg,
  .main-image-icon img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .main-image-icon img {
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.8;
  }
`;
})), As, js = e((() => {
	j(), As = c`
  .status {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .status-item {
    display: inline-flex;
    align-items: center;
    min-width: 0;
  }

  .status-separator {
    padding: 0 0.35em;
  }

  .status-prefix-icon {
    --mdc-icon-size: 0.9em;
    width: 0.9em;
    height: 0.9em;
    margin-right: 0.15em;
    flex: none;
  }

  .status-prefix-image {
    display: inline-flex;
    color: currentColor;
  }

  .status-prefix-image svg,
  .status-prefix-image img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .status-prefix-text {
    margin-right: 0.15em;
    flex: none;
  }

  .header.compressed {
    width: calc(100% - (var(--button-area-width) - 5px));
  }

  .button-column[style*="--button-count:4"] ~ .header.compressed {
    width: calc(100% - (var(--button-area-width) - 18px));
  }
`;
})), Ms, Ns = e((() => {
	j(), Ms = c`
  ha-card {
    aspect-ratio: 1 / 1;
  }

  .container {
    --button-area-width: clamp(46px, 23.5cqw, 210px);
  }
`;
})), Ps, Fs = e((() => {
	j(), Ps = c`
  .curve-button {
    position: absolute;
    width: 22%;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    background: transparent !important;
    box-shadow: none !important;

    display: flex;
    align-items: center;
    justify-content: center;

    pointer-events: auto;
    cursor: pointer;
    z-index: 5;

    transition: transform 0.2s ease;
  }

  .curve-button:hover {
    transform: scale(1.12);
  }

  .curve-button:active {
    transform: scale(0.92);
  }
`;
})), Is, Ls = e((() => {
	j(), Is = c`
  .curve-buttons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 4;
  }
`;
})), Rs, zs = e((() => {
	j(), Rs = c`
  .curve-button ha-icon {
    width: clamp(24px, 13cqw, 78px);
    height: clamp(24px, 13cqw, 78px);
    --mdc-icon-size: 100%;
  }

  .curve-image-icon {
    width: clamp(24px, 13cqw, 78px);
    height: clamp(24px, 13cqw, 78px);

    display: flex;
    align-items: center;
    justify-content: center;

    pointer-events: none;
    user-select: none;
  }

  .curve-image-icon svg {
    width: 100%;
    height: 100%;
  }

  .curve-button.action-button ha-icon,
  .curve-button.action-button .curve-image-icon {
    width: clamp(30px, 16cqw, 96px);
    height: clamp(30px, 16cqw, 96px);
  }
`;
})), Bs, Vs = e((() => {
	j(), Bs = c`
  .curve-button.pos-0 {
    top: 7%;
    left: 17%;
  }

  .curve-button.pos-1 {
    top: 2%;
    left: 37%;
  }

  .curve-button.pos-2 {
    top: 6%;
    right: 20%;
  }

  .curve-button.pos-3 {
    top: 22%;
    right: 4%;
  }

  .curve-button.pos-4 {
    bottom: 38%;
    right: 0%;
  }

  .curve-button.pos-5 {
    bottom: 16%;
    right: 7%;
  }

  .curve-button.action-button {
    top: -12%;
    right: 0%;
    width: 27%;
  }
`;
})), Hs, Us = e((() => {
	j(), Hs = c`
  .entity-button {
    width: min(
      clamp(44px, 26cqw, 250px),
      calc(
        (100cqh - (var(--button-count, 4) - 1) * clamp(10px, 2cqw, 22px)) /
          var(--button-count, 4)
      )
    );

    aspect-ratio: 1 / 1;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
  }

  .entity-button:hover {
    transform: scale(1.05);
  }

  .entity-button:active {
    transform: scale(0.95);
  }

  .entity-button ha-icon {
    --mdc-icon-size: 54%;
  }

  .button-image-icon {
    width: 54%;
    height: 54%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    user-select: none;
  }

  .button-image-icon svg {
    width: 100%;
    height: 100%;
  }
`;
})), Ws, Gs = e((() => {
	j(), Ws = c`
  .button-column {
    position: absolute;
    right: -2cqw;
    top: 0;
    bottom: -2cqw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: var(--button-area-width);
  }

  .button-column[style*="--button-count:1"] {
    justify-content: center;
  }

  .button-column[style*="--button-count:2"] {
    justify-content: space-between;
    padding-top: 35%;
  }

  .button-column[style*="--button-count:3"],
  .button-column[style*="--button-count:4"] {
    justify-content: space-between;
  }
`;
})), Ks, qs = e((() => {
	j(), Ks = c`
  .circle {
    position: absolute;
    bottom: -12%;
    left: -12%;
    width: 75%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    pointer-events: auto;
    z-index: 3;
  }
`;
})), Js, Ys = e((() => {
	Ts(), Ds(), ks(), js(), Ns(), Fs(), Ls(), zs(), Vs(), Us(), Gs(), qs(), Js = [
		Es,
		ws,
		Os,
		Ms,
		As,
		Ks,
		Hs,
		Ws,
		Ps,
		Is,
		Rs,
		Bs
	];
}));
//#endregion
//#region src/common/editor/helpers/icon.js
function G(e, t) {
	return e._t ? e._t(t) : t;
}
function Xs(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".gif") || t.endsWith(".webp");
}
function Zs(e) {
	return e ? e.startsWith("orbit:") ? Qs(e.slice(6)) : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function Qs(e) {
	let t = import.meta.url.split("?")[0];
	return `${t.slice(0, t.lastIndexOf("/") + 1)}icons/${e}`;
}
function $s(e, t, n) {
	let r = this._config?.[t] || "", i = `${this._iconPickerPrefix || "icon"}-${t}`, a = r && this._isImageIcon(r) ? "files" : "ha", o = this._iconPickerKey === i && this._iconPickerTab || a;
	return o === "files" && !this._orbitIconFilesLoading && !this._localIconFilesLoading && !(this._orbitIconFiles || []).length && !(this._localIconFiles || []).length && queueMicrotask(() => this._loadLocalIconFiles?.(r)), w`
    <div class="field">
      <label>${G(this, e)}</label>

      <div
        class="icon-picker-panel"
        @click=${(e) => e.stopPropagation()}
      >
        <div class="icon-tabs">
          <button
            type="button"
            class=${o === "ha" ? "active" : ""}
            @click=${() => {
		this._iconPickerKey = i, this._iconPickerTab = "ha";
	}}
          >
            ${G(this, "Icons")}
          </button>
          <button
            type="button"
            class=${o === "files" ? "active" : ""}
            @click=${() => {
		this._iconPickerKey = i, this._iconPickerTab = "files", this._loadLocalIconFiles?.(r);
	}}
          >
            ${G(this, "Files")}
          </button>
        </div>

        ${o === "files" ? nc.call(this, t, r) : tc.call(this, t, r)}
      </div>
    </div>
  `;
}
async function ec(e = "") {
	let t = xc(e);
	this._localIconFilesLoading = !0, this._orbitIconFilesLoading = !0, this.requestUpdate();
	let [n, r] = await Promise.all([mc(), hc()]);
	this._orbitIconFiles = Cc(n), this._localIconFiles = Cc([t?.source === "local" || !t?.source ? t : null, ...r]), this._orbitIconFilesLoading = !1, this._localIconFilesLoading = !1, this.requestUpdate();
}
function tc(e, t) {
	return w`
    <ha-icon-picker
      .hass=${this.hass}
      .value=${t && !this._isImageIcon(t) ? t : ""}
      @value-changed=${(t) => {
		this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-icon-picker>
  `;
}
function nc(e, t) {
	let n = this._orbitIconFiles || [], r = this._localIconFiles || [], i = rc([...n, ...r]);
	return this._orbitIconFilesLoading || this._localIconFilesLoading ? w`
      <div class="icon-picker-note">${G(this, "Loading files...")}</div>
    ` : !n.length && !r.length ? w`
      <div class="icon-picker-note">
        ${G(this, "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.")}
      </div>
    ` : w`
    <ha-generic-picker
      .value=${t && this._isImageIcon(t) ? t : ""}
      .getItems=${(e) => ac(i, e)}
      .rowRenderer=${(e) => oc.call(this, e)}
      .valueRenderer=${(e) => sc.call(this, i.find((t) => t.id === e))}
      .notFoundLabel=${G(this, "No matching files")}
      .emptyLabel=${""}
      .noSort=${!0}
      @value-changed=${(t) => {
		t.stopPropagation(), this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-generic-picker>
  `;
}
function rc(e) {
	return Cc(e).map((e) => {
		let t = Sc(e), n = ic(e);
		return {
			id: t,
			primary: n,
			sorting_label: n,
			iconFile: e,
			search_labels: {
				label: n,
				file: e.file || "",
				name: e.name || "",
				value: t
			}
		};
	});
}
function ic(e) {
	return `${e.source ? `${e.source}:` : ""}${(e.name || e.file || "").trim().replace(/\s+/g, "-")}`;
}
function ac(e, t = "") {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => Object.values(e.search_labels || {}).some((e) => String(e).toLowerCase().includes(n))) : e;
}
function oc(e) {
	return w`
    <ha-combo-box-item type="button" compact>
      ${cc.call(this, e)}
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
}
function sc(e) {
	return e ? w`
    ${cc.call(this, e)}
    <span slot="headline">${e.primary}</span>
  ` : "";
}
function cc(e) {
	return e?.iconFile ? w`
    <span
      slot="start"
      class="file-picker-preview"
      style=${uc()}
    >
      ${lc.call(this, e.iconFile)}
    </span>
  ` : "";
}
function lc(e) {
	let t = Sc(e), n = this._resolveIconPath(t);
	if (!n) return w``;
	let r = this._getInlineSvg ? this._getInlineSvg(n) : "", i = this.hass?.themes?.darkMode ?? this.hass?.selectedTheme?.dark ?? !1, a = uc(), o = dc(i);
	return w`
    <span
      class="file-picker-preview-inner"
      style=${a}
    >
      ${r ? w`${V(fc(r))}` : w`
            <img
              class=${i ? "dark" : ""}
              src=${n}
              alt=""
              width="24"
              height="24"
              style=${o}
              loading="eager"
              decoding="sync"
              fetchpriority="high"
            />
          `}
    </span>
  `;
}
function uc() {
	return [
		"display:inline-flex",
		"flex:0 0 24px",
		"width:24px !important",
		"height:24px !important",
		"min-width:24px !important",
		"min-height:24px !important",
		"max-width:24px !important",
		"max-height:24px !important",
		"align-items:center",
		"justify-content:center",
		"overflow:hidden",
		"line-height:0",
		"box-sizing:border-box",
		"contain:layout paint",
		"color:var(--secondary-text-color)"
	].join(";");
}
function dc(e) {
	return [
		"display:block",
		"flex:none",
		"width:24px !important",
		"height:24px !important",
		"min-width:24px !important",
		"min-height:24px !important",
		"max-width:24px !important",
		"max-height:24px !important",
		"object-fit:contain",
		"box-sizing:border-box",
		"overflow:hidden",
		e ? "filter:brightness(0) invert(72%)" : "filter:brightness(0) opacity(72%)"
	].join(";");
}
function fc(e) {
	if (!e) return "";
	let t = pc(e.replace(/<\?xml[^>]*>/gi, "").trim()), n = t.match(/<svg\b[^>]*>/i)?.[0];
	if (!n) return t;
	let r = [
		"display:block",
		"flex:none",
		"width:24px !important",
		"height:24px !important",
		"min-width:24px !important",
		"min-height:24px !important",
		"max-width:24px !important",
		"max-height:24px !important",
		"overflow:hidden",
		"box-sizing:border-box",
		"color:var(--secondary-text-color)",
		"vertical-align:middle",
		"pointer-events:none"
	].join(";"), i = n.replace(/\swidth=(["'])[^"']*\1/gi, "").replace(/\sheight=(["'])[^"']*\1/gi, "").replace(/\sstyle=(["'])[^"']*\1/gi, "").replace(/\spreserveAspectRatio=(["'])[^"']*\1/gi, "");
	return i = i.replace(/^<svg\b/i, `<svg width="24" height="24" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true" style="${r}"`), t.replace(n, i);
}
function pc(e) {
	let t = "(?!none\\b|currentColor\\b|transparent\\b|inherit\\b|url\\()(?:rgb\\([^)]*\\)|rgba\\([^)]*\\)|hsl\\([^)]*\\)|hsla\\([^)]*\\)|[^\"';)]+)";
	return e.replace(RegExp(`\\s(fill|stroke)=(["'])${t}\\2`, "gi"), (e, t) => ` ${t}="currentColor"`).replace(RegExp(`(fill|stroke)\\s*:\\s*${t}`, "gi"), (e, t) => `${t}:currentColor`);
}
async function mc() {
	return (await gc([Qs("manifest.json"), Qs("orbit-icons.json")])).map((e) => ({
		...e,
		source: "orbit"
	}));
}
async function hc() {
	let e = Array.isArray(window.ORBIT_ICON_FILES) ? window.ORBIT_ICON_FILES : [], t = await gc([
		"/local/icons/manifest.json",
		"/local/icons/orbit-icons.json",
		"/local/icons/icons.json"
	]), n = await _c();
	return [
		...e,
		...t,
		...n
	].filter(yc).map((e) => bc(e, "local"));
}
async function gc(e) {
	for (let t of e) try {
		let e = await fetch(t, { cache: "no-store" });
		if (!e.ok) continue;
		let n = await e.json(), r = Array.isArray(n) ? n : n.files;
		if (Array.isArray(r)) return r.filter(yc).map((e) => bc(e));
	} catch {}
	return [];
}
async function _c() {
	try {
		let e = await fetch("/local/icons/", { cache: "no-store" });
		return e.ok ? [...(await e.text()).matchAll(/href=["']([^"']+)["']/gi)].map((e) => e[1]) : [];
	} catch {
		return [];
	}
}
function vc(e) {
	return e ? (typeof e == "object" ? e.file : e).toString().split("?")[0].split("/").pop() : "";
}
function yc(e) {
	return Xs(vc(e));
}
function bc(e, t = "") {
	let n = vc(e);
	return n ? {
		file: n,
		name: typeof e == "object" && e.name || n,
		tags: Array.isArray(e?.tags) ? e.tags : [],
		source: e?.source || t
	} : null;
}
function xc(e) {
	if (!e || !yc(e)) return null;
	let t = vc(e);
	return t ? {
		file: t,
		name: t,
		tags: [],
		source: e?.toString().startsWith("orbit:") ? "orbit" : e?.toString().startsWith("local:") ? "local" : ""
	} : null;
}
function Sc(e) {
	return e.source === "orbit" ? `orbit:${e.file}` : e.source === "local" ? `local:${e.file}` : e.file;
}
function Cc(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter(Boolean).filter((e) => {
		let n = `${e.source || ""}:${e.file}`;
		return t.has(n) ? !1 : (t.add(n), !0);
	}).sort((e, t) => (e.name || e.file).localeCompare(t.name || t.file));
}
var wc = e((() => {
	j(), H();
}));
//#endregion
//#region src/common/editor/helpers/inputs.js
function Tc(e, t) {
	return e._t ? e._t(t) : t;
}
function Ec(e, t, n) {
	return w`
      <div class="field">
        <label>${Tc(this, e)}</label>

        <input
          .value=${this._config?.[t] || ""}
          placeholder=${n}
          @input=${(e) => this._handleInput(t, e)}
        />
      </div>
    `;
}
function Dc(e, t) {
	return w`
      <div class="field">
        <label>${Tc(this, e)}</label>

        <input
          .value=${this._config?.[t] || ""}
          placeholder="states[entity.entity_id].attributes.percentage > 50"
          @input=${(e) => this._handleConfigUpdate(t, e.target.value)}
        />
      </div>
    `;
}
var Oc = e((() => {
	j();
}));
//#endregion
//#region src/common/editor/helpers/config.js
function kc(e, t) {
	let n = {
		...e || {},
		...t
	};
	return Object.keys(n).forEach((e) => {
		n[e] === void 0 && delete n[e];
	}), n;
}
function K(e, t = {}) {
	let n = { ...t };
	return e.forEach((e) => {
		n[e] = void 0;
	}), n;
}
function q(e, t = []) {
	return K([e, ...t]);
}
function Ac(e, t = []) {
	return K([e, ...t.map((t) => `${e}${t}`)]);
}
var jc = e((() => {}));
//#endregion
//#region src/common/editor/helpers/renders.js
function J(e, t, n) {
	return e._t ? e._t(t, n) : t;
}
function Y(e, t) {
	return Nc(e?.hass, t) || pl[t] || t;
}
function Mc(e, t) {
	return Pc(e?.hass, t) || t;
}
function Nc(e, t) {
	if (!e?.localize || !t) return null;
	let n = [t, t.replaceAll("-", "_")].flatMap((e) => [
		`ui.panel.lovelace.editor.action-editor.actions.${e}`,
		`ui.panel.lovelace.editor.card.generic.action.actions.${e}`,
		`ui.panel.lovelace.editor.card.generic.action.${e}`,
		`ui.panel.lovelace.editor.card.config.action.actions.${e}`,
		`ui.panel.lovelace.editor.card.config.action.${e}`,
		`ui.components.action-input.editor.action.${e}`
	]);
	for (let r of n) {
		let n = e.localize(r);
		if (n && n !== r && n !== t) return n;
	}
	return null;
}
function Pc(e, t) {
	if (!e?.localize || !t) return null;
	let n = ml[t] || [];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
function Fc(e, t) {
	let n = this._config?.[t] || "";
	return Ic.call(this, e, t, n, (e) => this._handleConfigUpdate(t, e));
}
function Ic(e, t, n, r, i = n) {
	Wc.call(this);
	let a = Qc(n), o = this._colorPickerKey === t && this._colorPickerTab || a;
	return w`
    <div class="field">
      <label>${J(this, e)}</label>

      <div class="color-row">
        <div
          class="color-popover"
          @click=${(e) => e.stopPropagation()}
        >
          <div class="color-tabs">
            <button
              type="button"
              class=${o === "picker" ? "active" : ""}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "picker", this._themeColorPickerOpen = !1;
	}}
            >
              ${J(this, "Picker")}
              <input
                class="tab-color-picker"
                type="color"
                .value=${this._getColorPickerValue(i)}
                @input=${(e) => r(e.target.value)}
                @change=${(e) => r(e.target.value)}
              />
            </button>
            <button
              type="button"
              class=${o === "theme" ? "active" : ""}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "theme", this._themeColorPickerOpen = !1, this._themeColorSearch = "";
	}}
            >
              ${J(this, "Theme")}
            </button>
          </div>

          ${o === "theme" ? w`
                ${Lc.call(this, n, r)}
              ` : w`
                <input
                  class="native-color-picker"
                  type="color"
                  .value=${this._getColorPickerValue(i)}
                  @input=${(e) => r(e.target.value)}
                  @change=${(e) => r(e.target.value)}
                />
              `}
        </div>
      </div>
    </div>
  `;
}
function Lc(e, t) {
	let n = Qc(e) === "theme" ? Jc(e) || "theme" : "", r = Uc.call(this);
	return w`
    <div
      class="theme-color-picker"
      @click=${(e) => e.stopPropagation()}
    >
      <ha-generic-picker
        .value=${n}
        .getItems=${() => r}
        .rowRenderer=${(e) => Rc.call(this, e)}
        .valueRenderer=${(e) => zc.call(this, r.find((t) => t.id === e))}
        .notFoundLabel=${J(this, "No matching colors")}
        .emptyLabel=${""}
        .noSort=${!0}
        @value-changed=${(e) => {
		e.stopPropagation(), t(e.detail.value || "");
	}}
      ></ha-generic-picker>
    </div>
  `;
}
function Rc(e) {
	return w`
    <ha-combo-box-item type="button" compact>
      ${Bc.call(this, e)}
      <span slot="headline">${e.primary}</span>
      ${Vc(e)}
    </ha-combo-box-item>
  `;
}
function zc(e) {
	return e ? w`
    ${Bc.call(this, e)}
    <span slot="headline">${e.primary}</span>
    ${Vc(e)}
  ` : "";
}
function Bc(e) {
	return e.id === "theme" ? w`
      <ha-icon
        slot="start"
        class="theme-color-default-icon"
        icon="mdi:palette"
      ></ha-icon>
    ` : w`
    <span
      slot="start"
      class="theme-color-swatch"
      style=${`
        ${this._getColorStyle(e.id)}
        display: block;
        width: 20px;
        height: 20px;
        border-radius: var(--ha-border-radius-pill, 999px);
        border: 1px solid var(--outline-color, var(--divider-color));
        box-sizing: border-box;
      `}
    ></span>
  `;
}
function Vc(e) {
	return e.isStandardFallback ? w`
        <span
          slot="end"
          class="theme-source-badge"
          aria-label="Standard"
          style="
            display: inline-flex;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            background: var(--primary-color);
            color: var(--text-primary-color);
            font-size: 8px;
            font-weight: 800;
            line-height: 1;
          "
        >S</span>
      ` : "";
}
function Hc() {
	let e = [], t = /* @__PURE__ */ new Set();
	for (let n of gl) {
		let r = Kc.call(this, n);
		!r || t.has(r.id) || (t.add(r.id), e.push(r));
	}
	return e;
}
function Uc() {
	let e = Gc.call(this);
	if (this._themeColorItemsCache && this._themeColorItemsCacheKey === e) return this._themeColorItemsCache;
	let t = Hc.call(this);
	return this._themeColorItemsCache = t, this._themeColorItemsCacheKey = e, t;
}
function Wc() {
	let e = Gc.call(this);
	if (this._themeColorItemsCacheKey === e || this._themeColorWarmupScheduled === e) return;
	this._themeColorWarmupScheduled = e;
	let t = () => {
		this._themeColorWarmupScheduled === e && (Uc.call(this), this._themeColorWarmupScheduled = "");
	};
	if (window.requestIdleCallback) {
		window.requestIdleCallback(t, { timeout: 500 });
		return;
	}
	window.setTimeout(t, 0);
}
function Gc() {
	return `${this.hass?.locale?.language || this.hass?.language || ""}|${this.hass?.selectedTheme?.theme || this.hass?.themes?.theme || ""}|${this.hass?.themes?.darkMode ?? this.hass?.selectedTheme?.dark ?? ""}`;
}
function Kc(e) {
	let t = qc(typeof e == "string" ? { id: e } : e), n = Yc(t.id), r = n && Xc(t.id), i = t.label ? J(this, t.label) : Zc.call(this, t.id);
	return {
		id: t.id,
		primary: i,
		secondary: n ? J(this, "Color") : J(this, "Theme"),
		sorting_label: i,
		isStandardFallback: r,
		search_labels: {
			color: t.id,
			label: i,
			source: r ? "standard" : "theme"
		}
	};
}
function qc(e) {
	return {
		...e,
		id: Jc(e.id),
		label: e.label || null
	};
}
function Jc(e) {
	if (!e) return "";
	let t = e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, ""), n = t.startsWith("color-") ? t.slice(6) : t;
	return hl[n] || n;
}
function Yc(e) {
	return e === "theme" || e === "primary-color" || e === "accent-color" || it(e);
}
function Xc(e) {
	return it(e) && !at(e);
}
function Zc(e) {
	return e === "theme" ? J(this, "State color (default)") : e === "light" ? J(this, "State Light color") : e === "primary-color" ? J(this, "Primary") : e === "accent-color" ? J(this, "Accent") : e.replaceAll("-", " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function Qc(e) {
	let t = e?.toString().trim();
	return t && (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl")) ? "picker" : "theme";
}
function $c(e, t, n) {
	let r = this._config?.[t], i = typeof n == "object" ? n : { action: n || "none" }, a = r && typeof r == "object" ? ul(r, i) : i, o = a.action || i.action || "none", s = tl(this);
	return w`
    <div class="field action-field">
      <label>${J(this, e)}</label>

      <div class="action-picker">
        <ha-generic-picker
          .value=${o}
          .getItems=${() => s}
          .rowRenderer=${(e) => nl(e)}
          .valueRenderer=${(e) => rl(s.find((t) => t.id === e))}
          .notFoundLabel=${J(this, "No matching actions")}
          .noSort=${!0}
          @value-changed=${(e) => {
		e.stopPropagation();
		let n = el(e) || "none";
		this._updateConfig({ [t]: ll(this, n, a) }), this.requestUpdate?.();
	}}
        ></ha-generic-picker>
      </div>

      ${o === "navigate" ? al.call(this, t, a) : ""}

      ${o === "call-service" ? ol.call(this, t, a) : ""}

      ${o === "url" ? sl.call(this, t, a) : ""}

      ${o === "popup" ? cl.call(this, t, a) : ""}
    </div>
  `;
}
function el(e) {
	let t = e.detail?.value ?? e.detail?.item?.id ?? e.target?.value ?? "";
	return typeof t == "object" ? t.id || t.value || "" : t;
}
function tl(e) {
	return [
		{
			id: "toggle",
			primary: Y(e, "toggle"),
			icon: "mdi:toggle-switch"
		},
		{
			id: "more-info",
			primary: Y(e, "more-info"),
			icon: "mdi:information-outline"
		},
		{
			id: "navigate",
			primary: Y(e, "navigate"),
			icon: "mdi:arrow-right"
		},
		{
			id: "call-service",
			primary: Y(e, "perform-action"),
			icon: "mdi:flash"
		},
		{
			id: "url",
			primary: Y(e, "url"),
			icon: "mdi:open-in-new"
		},
		{
			id: "popup",
			primary: Y(e, "popup"),
			icon: "mdi:window-open"
		},
		{
			id: "none",
			primary: Y(e, "none"),
			icon: "mdi:close-circle-outline"
		}
	];
}
function nl(e) {
	return w`
    <ha-combo-box-item type="button" compact>
      ${il(e)}
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
}
function rl(e) {
	return e ? w`
    ${il(e)}
    <span slot="headline">${e.primary}</span>
  ` : "";
}
function il(e) {
	return w`
    <ha-icon
      slot="start"
      .icon=${e.icon}
    ></ha-icon>
  `;
}
function al(e, t) {
	return w`
    <div class="inline-field action-subfield">
      <ha-navigation-picker
        .hass=${this.hass}
        .value=${t.navigation_path || ""}
        @value-changed=${(n) => {
		n.stopPropagation(), this._updateConfig({ [e]: X({
			...t,
			navigation_path: n.detail.value || ""
		}) });
	}}
      ></ha-navigation-picker>
    </div>
  `;
}
function ol(e, t) {
	let n = {
		action: t.perform_action || t.service || "",
		...t.data || t.service_data ? { data: t.data || t.service_data } : {},
		...t.target ? { target: t.target } : {}
	};
	return w`
    <div class="inline-field action-subfield">
      <ha-service-control
        .hass=${this.hass}
        .value=${n}
        narrow
        @value-changed=${(n) => {
		n.stopPropagation();
		let r = n.detail.value || {};
		this._updateConfig({ [e]: X({
			...t,
			service: r.action || "",
			service_data: r.data,
			target: r.target
		}) });
	}}
      ></ha-service-control>
    </div>
  `;
}
function sl(e, t) {
	return w`
    <div class="inline-field action-subfield">
      <ha-input
        .label=${Mc(this, "url")}
        .value=${t.url_path || ""}
        @input=${(n) => {
		n.stopPropagation(), this._updateConfig({ [e]: X({
			...t,
			url_path: n.target.value
		}) });
	}}
      ></ha-input>
    </div>
  `;
}
function cl(e, t) {
	return w`
    <div class="inline-field action-subfield">
      <span class="inline-label">${Mc(this, "title")}</span>

      <input
        .value=${t.popup_title || ""}
        placeholder="Security"
        @input=${(n) => this._updateConfig({ [e]: X({
		...t,
		popup_title: n.target.value
	}) })}
      />
    </div>

    <div class="inline-field action-subfield">
      <span class="inline-label">${Mc(this, "content")}</span>

      <input
        .value=${typeof t.popup_content == "string" ? t.popup_content : t.popup_content ? JSON.stringify(t.popup_content) : ""}
        placeholder=""
        @input=${(n) => this._updateConfig({ [e]: X({
		...t,
		popup_content: n.target.value
	}) })}
      />
    </div>
  `;
}
function ll(e, t, n) {
	let r = X({
		...n,
		action: t
	});
	return t === "popup" ? X({
		...r,
		popup_title: r.popup_title || J(e, "Security"),
		popup_content: r.popup_content || {
			type: "vertical-stack",
			cards: [{
				type: "tile",
				entity: "alarm_control_panel.house_alarm",
				vertical: !0
			}]
		},
		style: r.style || "--popup-min-width: 400px;\n--popup-max-width: 500px;\n--popup-border-radius: 20px;"
	}) : r;
}
function ul(e, t) {
	let n = e.action === "perform-action" ? "call-service" : e.action;
	return X({
		...t,
		...e,
		action: n || t.action || "none"
	});
}
function X(e) {
	let t = e?.action === "perform-action" ? "call-service" : e?.action || "none", n = { action: t };
	return t === "navigate" ? (n.navigation_path = e.navigation_path || "", n) : t === "call-service" ? (n.service = e.service || e.perform_action || "", (e.service_data || e.data) && (n.service_data = { ...e.service_data || e.data }), e.target && (n.target = { ...e.target }), n) : t === "url" ? (n.url_path = e.url_path || "", n) : t === "popup" ? (n.popup_title = e.popup_title || "", n.popup_content = e.popup_content || "", e.style && (n.style = e.style), e.card_mod && (n.card_mod = e.card_mod), n) : n;
}
function dl(e, t) {
	return w`
    <div class="field">
      <label>${J(this, e)}</label>

      <div class="entity-row">
        <ha-selector
          class="entity-picker"
          .hass=${this.hass}
          .selector=${{ entity: {} }}
          .value=${this._config?.[t] || ""}
          @value-changed=${(e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e.detail.value || "") : this._handleConfigUpdate(t, e.detail.value || "")}
        ></ha-selector>

        ${this._config?.[t] ? w`
              <button
                type="button"
                class="clear-button"
                @click=${() => this._handleEntityUpdate ? this._handleEntityUpdate(t, "") : this._updateConfig({ [t]: "" })}
              >
                ✕
              </button>
            ` : ""}
      </div>
    </div>
  `;
}
function fl(e, t) {
	return w`
    <div class="field">
      <label>${J(this, e)}</label>

      <ha-selector
        .hass=${this.hass}
        .selector=${{ area: {} }}
        .value=${this._config?.[t] || ""}
        @value-changed=${(e) => this._updateConfig({ [t]: e.detail.value })}
      ></ha-selector>
    </div>
  `;
}
var pl, ml, hl, gl, _l = e((() => {
	j(), P(), pl = {
		"call-service": "Perform action",
		"more-info": "More info",
		navigate: "Navigate",
		none: "Nothing",
		popup: "Popup",
		"perform-action": "Perform action",
		toggle: "Toggle",
		url: "URL"
	}, ml = {
		content: ["ui.panel.lovelace.editor.card.markdown.content"],
		entity_id: ["ui.dialogs.entity_registry.editor.entity_id", "ui.panel.lovelace.unused_entities.entity_id"],
		path: ["ui.panel.lovelace.editor.action-editor.navigation_path", "ui.panel.lovelace.editor.edit_view.path"],
		service: ["ui.panel.developer-tools.tabs.actions.actions.call_service", "ui.panel.config.devices.type.service_heading"],
		title: ["ui.panel.lovelace.editor.edit_lovelace.title", "ui.panel.lovelace.dashboards.picker.headers.title"],
		url: ["ui.panel.lovelace.editor.action-editor.url_path"]
	}, hl = {
		bluegrey: "blue-grey",
		darkgrey: "dark-grey",
		deeporange: "deep-orange",
		deeppurple: "deep-purple",
		lightblue: "light-blue",
		lightgreen: "light-green",
		lightgrey: "light-grey"
	}, gl = [
		{
			id: "theme",
			label: "State color (default)"
		},
		{
			id: "light",
			label: "State Light color"
		},
		"primary-color",
		"accent-color",
		"red",
		"pink",
		"purple",
		"deep-purple",
		"indigo",
		"blue",
		"light-blue",
		"cyan",
		"teal",
		"green",
		"light-green",
		"lime",
		"yellow",
		"amber",
		"orange",
		"deep-orange",
		"brown",
		"light-grey",
		"grey",
		"dark-grey",
		"blue-grey",
		"black",
		"white",
		"disabled",
		"state-icon-color",
		"state-light-active-color",
		"gold",
		"violet",
		"google-red",
		"google-green",
		"google-yellow",
		"google-blue",
		"google-violet",
		"google-grey",
		"color-red",
		"color-green",
		"color-yellow",
		"color-amber",
		"color-blue",
		"color-purple",
		"color-violet",
		"color-grey",
		"color-darkgrey",
		"color-pink",
		"color-orange",
		"color-gold",
		"color-brown"
	];
}));
//#endregion
//#region src/common/editor/helpers/helpers.js
function vl(e) {
	e._editorPopoverCloseHandler || (e._editorPopoverCloseHandler = (t) => {
		!e._iconPickerKey && !e._colorPickerKey || bl(t.composedPath?.() || []) || (e._iconPickerKey = "", e._colorPickerKey = "", e._iconFilePickerOpen = !1, e._iconFileSearch = "", e._themeColorPickerOpen = !1, e._themeColorSearch = "", e.requestUpdate?.());
	}, document.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0));
}
function yl(e) {
	e._editorPopoverCloseHandler &&= (document.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), null);
}
function bl(e) {
	return e.some((e) => {
		let t = e?.classList, n = e?.tagName?.toLowerCase?.();
		return t?.contains("icon-popover") || t?.contains("color-popover") || t?.contains("icon-preview") || t?.contains("color-preview") || t?.contains("color-control-button") || t?.contains("mdc-menu-surface") || n === "ha-generic-picker" || n === "ha-icon-picker" || n === "ha-combo-box" || n === "ha-combo-box-item" || n === "mwc-list" || n === "mwc-list-item";
	});
}
function xl(e) {
	if (!e) return "background-color: rgb(var(--color-theme));";
	let t = e.toString().trim().toLowerCase();
	if (t.startsWith("#") || t.startsWith("rgb(") || t.startsWith("hsl(")) return `background-color:${t};`;
	let n = t.replace(/[^a-z0-9-_]/g, "");
	return n ? `background-color: ${rt(n)};` : "background-color: rgb(var(--color-theme));";
}
function Sl(e) {
	let t = e?.toString().trim();
	return t && (El(t) || Dl(t) || Cl(t)) || "#ffffff";
}
function Cl(e, t = /* @__PURE__ */ new Set()) {
	let n = e?.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
	if (!n || t.has(n)) return "";
	t.add(n);
	let r = ot(n), i = at(n) ? Tl(r) : "", a = it(n) ? Tl(`${n}-color`) : "", o = Tl(n), s = n.startsWith("color-") ? "" : Tl(`color-${n}`);
	return wl(i, t) || wl(a, t) || wl(o, t) || wl(s, t) || "";
}
function wl(e, t) {
	let n = e?.trim();
	if (!n) return "";
	let r = El(n);
	if (r) return r;
	let i = Dl(n);
	if (i) return i;
	let a = n.match(/^var\(\s*--([^),\s]+)\s*\)$/i);
	return a ? Cl(a[1], t) : "";
}
function Tl(e) {
	let t = `--${e}`, n = [document.documentElement, document.body].filter(Boolean);
	for (let e of n) {
		let n = getComputedStyle(e).getPropertyValue(t).trim();
		if (n) return n;
	}
	return "";
}
function El(e) {
	return /^#[0-9a-f]{6}$/i.test(e) ? e : /^#[0-9a-f]{3}$/i.test(e) ? `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}` : "";
}
function Dl(e) {
	let t = e.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
	if (t) return Ol(Number(t[1]), Number(t[2]), Number(t[3]));
	let n = e.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/i);
	return n ? Ol(Number(n[1]), Number(n[2]), Number(n[3])) : "";
}
function Ol(e, t, n) {
	return `#${kl(e)}${kl(t)}${kl(n)}`;
}
function kl(e) {
	return Math.max(0, Math.min(255, e || 0)).toString(16).padStart(2, "0");
}
var Al = e((() => {
	j(), wc(), kt(), P(), Oc(), jc(), _l();
}));
//#endregion
//#region src/editors/room/sections/room.js
function jl() {
	return w`
    <div class="section">
      ${this._renderInput("Name", "room_name")}

      <div class="field">
        <label>${this._t("Navigation Path")}</label>

        <input
          .value=${this._config?.navigate?.navigation_path || ""}
          placeholder="/lovelace/home"
          @input=${(e) => {
		this._updateConfig({ navigate: { navigation_path: e.target.value } });
	}}
        />
      </div>

      ${this._renderArea("Area", "area")}
      <div class="color-pair">
        ${this._renderColor("Accent Color", "accent_color")}
        ${this._renderColorControl("Status Color", "status_color", this._config?.status_color || this._config?.accent_color || "", (e) => this._handleConfigUpdate("status_color", e), this._config?.status_color || this._config?.accent_color || "")}
      </div>

      ${this._renderEntity("Main Entity", "main_entity")}
      ${this._renderIconInput("Main Entity Icon", "main_entity_icon")}

      <div class="icon-pair">
        ${this._renderIconInput("Main Entity ON Icon", "main_entity_icon_on")}
        ${this._renderIconInput("Main Entity OFF Icon", "main_entity_icon_off")}
      </div>

      ${this._config?.main_entity ? w`
            ${this._renderActionSelector("Main Entity Action", "main_entity_tap_action", "more-info")}
            ${this._renderActionSelector("Hold Action", "main_entity_hold_action", "none")}
          ` : ""}
    </div>
  `;
}
var Ml = e((() => {
	j();
}));
//#endregion
//#region src/editors/room/sections/buttons.js
function Nl() {
	let e = this._selectedButtonIndex || 1;
	return w`
    <div class="section">
      ${Pl.call(this, [
		1,
		2,
		3,
		4
	], e, (e) => {
		this._selectedButtonIndex = e;
	})}

      ${Fl.call(this, e)}
    </div>
  `;
}
function Pl(e, t, n) {
	return w`
    <div
      class="editor-segment-menu"
      style="--editor-segment-columns: 4;"
    >
      ${e.map((e) => w`
        <button
          type="button"
          class="editor-segment-item ${t === e ? "active" : ""}"
          @click=${() => n(e)}
        >
          ${this._t("Button {index}", { index: e })}
        </button>
      `)}
    </div>
  `;
}
function Fl(e) {
	let t = `button${e}`;
	return w`
    <div class="sub-section selected-button-section">
      ${this._renderEntity("Entity", t)}

      <div class="color-pair">
        ${this._renderColor("ON Color", `${t}_on_color`)}
        ${this._renderColor("OFF Color", `${t}_off_color`)}
      </div>

      ${this._renderIconInput("Icon", `${t}_icon`)}
      <div class="icon-pair">
        ${this._renderIconInput("ON Icon", `${t}_icon_on`)}
        ${this._renderIconInput("OFF Icon", `${t}_icon_off`)}
      </div>

      ${this._renderTemplateInput("State Template", `${t}_state_template`)}

      ${this._renderActionSelector("Tap Action", `${t}_tap_action`, "toggle")}

      ${this._renderActionSelector("Hold Action", `${t}_hold_action`, "more-info")}
    </div>
  `;
}
var Il = e((() => {
	j();
}));
//#endregion
//#region src/editors/room/sections/curve-buttons.js
function Ll() {
	let e = this._selectedCurveButtonIndex || 1;
	return w`
    <div class="section">
      <label class="editor-toggle-row">
        <span>${this._t("Lock Curve Button Positions")}</span>
        <ha-switch
          .checked=${!!this._config?.curve_buttons_lock_position}
          @change=${(e) => this._updateConfig({ curve_buttons_lock_position: e.target.checked })}
        ></ha-switch>
      </label>

      <div class="curve-divider"></div>

      ${zl.call(this, [
		1,
		2,
		3,
		4,
		5,
		6
	], e, (e) => {
		this._selectedCurveButtonIndex = e;
	})}

      ${Bl.call(this, `curve_button${e}`, "", "more-info", { index: e })}
    </div>
  `;
}
function Rl() {
	let e = Wt(this._config?.action_button);
	return w`
    <div class="section">
      ${Vl.call(this)}

      ${Bl.call(this, "action_button", "", e, {}, {
		showColors: !0,
		filteredEntity: !0
	})}
    </div>
  `;
}
function zl(e, t, n) {
	return w`
    <div class="editor-segment-menu">
      ${e.map((e) => w`
        <button
          type="button"
          class="editor-segment-item ${t === e ? "active" : ""}"
          @click=${() => n(e)}
        >
          ${this._t("Button {index}", { index: e })}
        </button>
      `)}
    </div>
  `;
}
function Bl(e, t, n, r = {}, i = {}) {
	return w`
    <div class="sub-section selected-button-section">
      ${t ? w`
            <div class="sub-section-title">
              ${this._t(t, r)}
            </div>
          ` : ""}

      ${i.filteredEntity ? Hl.call(this, "Entity", e) : this._renderEntity("Entity", e)}

      ${i.showColors ? w`
            <div class="color-pair">
              ${Ul.call(this, "ON Color", `${e}_on_color`)}
              ${Ul.call(this, "OFF Color", `${e}_off_color`)}
            </div>
          ` : ""}

      ${this._renderIconInput("Icon", `${e}_icon`)}
      <div class="icon-pair">
        ${this._renderIconInput("ON Icon", `${e}_icon_on`)}
        ${this._renderIconInput("OFF Icon", `${e}_icon_off`)}
      </div>

      ${this._renderTemplateInput("State Template", `${e}_state_template`)}

      ${this._renderActionSelector("Tap Action", `${e}_tap_action`, n)}

      ${this._renderActionSelector("Hold Action", `${e}_hold_action`, "none")}
    </div>
  `;
}
function Vl() {
	let e = this._roomActionButtonDomainFilter || "all";
	return w`
    <div class="action-domain-filters">
      ${Wl.map((t) => w`
        <button
          type="button"
          class=${t.value === e ? "active" : ""}
          @click=${() => {
		this._roomActionButtonDomainFilter = t.value;
	}}
        >
          ${this._t(t.label)}
        </button>
      `)}
    </div>
  `;
}
function Hl(e, t) {
	let n = this._roomActionButtonDomainFilter || "all", r = Wl.find((e) => e.value === n) || Wl[0], i = r.domains ? { entity: { domain: r.domains } } : { entity: {} };
	return w`
    <div class="field">
      <label>${this._t(e)}</label>

      <div class="entity-row">
        <ha-selector
          class="entity-picker"
          .hass=${this.hass}
          .selector=${i}
          .value=${this._config?.[t] || ""}
          @value-changed=${(e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e.detail.value || "") : this._handleConfigUpdate(t, e.detail.value || "")}
        ></ha-selector>

        ${this._config?.[t] ? w`
              <button
                type="button"
                class="clear-button"
                @click=${() => this._handleEntityUpdate ? this._handleEntityUpdate(t, "") : this._updateConfig({ [t]: "" })}
              >
                ✕
              </button>
            ` : ""}
      </div>
    </div>
  `;
}
function Ul(e, t) {
	let n = this._config?.[t] || "", r = n === "theme" ? "" : n, i = r || this._config?.accent_color || "theme";
	return this._renderColorControl(e, t, r, (e) => this._handleConfigUpdate(t, e), i);
}
var Wl, Gl = e((() => {
	j(), qt(), Wl = [
		{
			label: "All",
			value: "all",
			domains: null
		},
		{
			label: "Automations",
			value: "automation",
			domains: ["automation"]
		},
		{
			label: "Buttons",
			value: "button",
			domains: [
				"button",
				"input_button",
				"input_boolean"
			]
		},
		{
			label: "Cameras",
			value: "camera",
			domains: ["camera"]
		},
		{
			label: "Scenes",
			value: "scene",
			domains: ["scene"]
		},
		{
			label: "Scripts",
			value: "script",
			domains: ["script"]
		}
	];
})), Kl, ql = e((() => {
	j(), Kl = c`
:host {
  display: block;
  font-family: var(--ha-font-family-body, var(--mdc-typography-font-family, Roboto, Noto, sans-serif));
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-normal, 20px);
  color: var(--primary-text-color);

  --orbit-editor-surface: color-mix(
    in srgb,
    var(--card-background-color, var(--secondary-background-color)) 96%,
    var(--primary-text-color, #fff) 4%
  );
  --orbit-editor-control: var(
    --input-fill-color,
    var(
      --mdc-text-field-fill-color,
      color-mix(
        in srgb,
        var(--card-background-color, var(--secondary-background-color)) 88%,
        var(--primary-text-color, #fff) 12%
      )
    )
  );
  --orbit-editor-control-hover: color-mix(
    in srgb,
    var(--orbit-editor-control) 86%,
    var(--primary-text-color, #fff) 14%
  );
  --orbit-editor-border: var(--outline-color, var(--divider-color));
  --orbit-editor-popover: color-mix(
    in srgb,
    var(--card-background-color, var(--secondary-background-color)) 94%,
    var(--primary-text-color, #fff) 6%
  );
  --orbit-editor-active: color-mix(
    in srgb,
    var(--primary-color) 20%,
    transparent
  );
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 14px 14px;
}
`;
})), Jl, Yl = e((() => {
	j(), Jl = c`
.section {
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 0;

  border: none;
  border-radius: 0;

  background: transparent;
}

.sub-section {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding-bottom: 12px;
  margin-bottom: 12px;

  border-bottom: 1px solid var(--orbit-editor-border);
}

.sub-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.curve-divider {
  height: 1px;

  margin: 4px 0 6px 0;

  background: var(--orbit-editor-border);
}
`;
})), Xl, Zl = e((() => {
	j(), Xl = c`
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  user-select: none;

  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);

  opacity: 0.75;

  transition: opacity 0.2s ease;
}

.section-header:hover {
  opacity: 1;
}

.sub-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  user-select: none;

  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);

  opacity: 0.72;

  padding-bottom: 6px;

  transition: opacity 0.2s ease;
}

.sub-section-header:hover {
  opacity: 1;
}

.collapse-icon {
  font-size: 18px;
  line-height: 1;
}
`;
})), Ql, $l = e((() => {
	j(), Ql = c`
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field > label {
  color: var(--primary-text-color);
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-condensed, 20px);
}

.color-pair,
.icon-pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

@media (max-width: 640px) {
  .color-pair,
  .icon-pair {
    grid-template-columns: 1fr;
  }
}

.editor-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 36px;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.9;
}

.editor-toggle-row span {
  opacity: 0.78;
}

input,
select {
  width: 100%;
  height: 56px;
  padding: 0 16px;

  border: none;
  border-bottom: 1px solid var(--input-ink-color, var(--secondary-text-color));
  border-radius: 4px 4px 0 0;

  background: var(--orbit-editor-control);
  color: inherit;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  line-height: var(--ha-line-height-expanded, 24px);

  outline: none;
  box-sizing: border-box;
}

input:focus,
select:focus {
  border-bottom-color: var(--primary-color);
  box-shadow: inset 0 -1px 0 var(--primary-color);
}

input::placeholder {
  color: var(--secondary-text-color);
  opacity: 1;
}

select {
  appearance: auto;
}

.editor-note {
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--orbit-editor-control);
  border: 1px solid var(--orbit-editor-border);
  color: inherit;
  font-size: var(--ha-font-size-s, 12px);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.72;
}

.editor-note code {
  display: block;
  margin-top: 4px;
  font-family: monospace;
  white-space: normal;
  overflow-wrap: anywhere;
}

`;
})), eu, tu = e((() => {
	j(), eu = c`
.entity-row {
  display: flex;
  align-items: stretch;
  gap: 8px;
  width: 100%;
}

.entity-picker {
  flex: 1;
  min-width: 0;
}

.entity-picker::part(root),
.entity-picker * {
  box-sizing: border-box;
}

.entity-selector {
  flex: 1;
  min-width: 0;
}

.entity-selector ha-selector {
  width: 100%;
  display: block;
}

.clear-button {
  flex: 0 0 42px;

  width: 42px;
  min-width: 42px;
  height: auto;

  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);

  background: var(--orbit-editor-control);
  color: inherit;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  line-height: 1;

  transition: background 0.2s ease;
}

.clear-button:hover {
  background: var(--orbit-editor-control-hover);
}
`;
})), nu, ru = e((() => {
	j(), nu = c`
.color-row {
  position: relative;
}

.color-control-button {
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border: 0;
  border-bottom: 1px solid var(--input-ink-color, var(--secondary-text-color));
  border-radius: 4px 4px 0 0;
  background: var(--orbit-editor-control);
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-expanded, 24px);
  text-align: left;
  box-sizing: border-box;
}

.color-control-button:focus {
  border-bottom-color: var(--primary-color);
  box-shadow: inset 0 -1px 0 var(--primary-color);
  outline: none;
}

.color-control-button ha-icon {
  --mdc-icon-size: 20px;
  opacity: 0.72;
}

.color-control-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.color-control-label.placeholder {
  color: var(--secondary-text-color);
}

.color-preview {
  position: relative;
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: var(--ha-border-radius-md, 8px);
  border: 1px solid var(--orbit-editor-border);
  cursor: pointer;
  overflow: hidden;
}

.color-popover {
  position: relative;
  width: 100%;
  max-width: 100%;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-sizing: border-box;
}

.color-tabs {
  display: flex;
  align-items: end;
  gap: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--orbit-editor-border);
  overflow-x: auto;
}

.color-tabs button {
  position: relative;
  min-width: 92px;
  height: 34px;
  padding: 0 12px;
  border: 0;
  border-bottom: 3px solid transparent;
  border-radius: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.62;
  overflow: hidden;
}

.color-tabs button.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  opacity: 1;
}

.native-color-picker {
  display: block;
  width: 100%;
  height: 56px;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
}

.tab-color-picker {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.theme-color-picker {
  position: relative;
}

.theme-color-picker ha-generic-picker {
  display: block;
  --ha-generic-picker-width: min(360px, calc(100vw - 48px));
  --ha-generic-picker-max-width: min(360px, calc(100vw - 48px));
}

.theme-color-select {
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border: 0;
  border-bottom: 1px solid var(--orbit-editor-border);
  border-radius: 4px 4px 0 0;
  background: var(--orbit-editor-control);
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-expanded, 24px);
  text-align: left;
}

.theme-color-select ha-icon {
  --mdc-icon-size: 20px;
  opacity: 0.7;
}

.theme-color-empty {
  grid-column: 1 / 4;
  min-height: 24px;
}

.theme-color-menu {
  position: absolute;
  z-index: 25;
  top: calc(100% + 2px);
  left: 0;
  right: 0;
  border-radius: var(--ha-border-radius-xl, 16px);
  background: var(--mdc-theme-surface, var(--orbit-editor-popover));
  border: 1px solid var(--orbit-editor-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}

.theme-color-search {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px;
  padding: 0 10px;
  height: 40px;
  border: 1px solid var(--primary-color);
  border-radius: var(--ha-border-radius-md, 8px);
  background: var(--mdc-theme-surface, var(--orbit-editor-popover));
}

.theme-color-search ha-icon {
  --mdc-icon-size: 20px;
  opacity: 0.68;
}

.theme-color-search input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
}

.theme-color-options {
  max-height: 392px;
  overflow: auto;
  border-top: 1px solid var(--orbit-editor-border);
}

.theme-color-option {
  width: 100%;
  min-height: 46px;
  display: grid;
  grid-template-columns: 30px 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 8px 14px;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  line-height: var(--ha-line-height-expanded, 24px);
  text-align: left;
}

.theme-color-option.active {
  background: var(--orbit-editor-active);
}

.theme-color-no-results {
  padding: 14px;
  opacity: 0.72;
}

.theme-color-preview {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.theme-color-swatch {
  display: block;
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: var(--ha-border-radius-pill, 999px);
  border: 1px solid var(--orbit-editor-border);
  box-sizing: border-box;
}

.theme-color-default-icon {
  --mdc-icon-size: 20px;
  color: var(--secondary-text-color);
}

.theme-color-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.theme-source-badge {
  display: inline-flex;
  flex: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  color: var(--text-primary-color);
  font-size: 8px;
  font-weight: 800;
  line-height: 1;
}

.theme-source-badge::before {
  content: "S";
}

.icon-input-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-input-row input {
  flex: 1;
}

.icon-preview {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: var(--ha-border-radius-md, 8px);
  background: var(--orbit-editor-control);
  border: 1px solid var(--orbit-editor-border);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

.preview-image-stack {
  position: relative;
  width: 24px;
  height: 24px;
  display: block;
}

.icon-preview .preview-image,
.icon-preview .preview-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.icon-preview .preview-image {
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.icon-preview .preview-svg {
  color: currentColor;
  display: flex;
  background: transparent;
}

.icon-preview .preview-svg svg {
  width: 100%;
  height: 100%;
}

.icon-preview ha-icon {
  --mdc-icon-size: 24px;
}

.icon-popover {
  position: absolute;
  z-index: 20;
  top: calc(100% + 8px);
  right: 0;
  width: min(360px, 100%);
  padding: 10px;
  border-radius: var(--ha-border-radius-xl, 16px);
  background: var(--mdc-theme-surface, var(--card-background-color, var(--secondary-background-color)));
  box-shadow: var(--ha-card-box-shadow, 0 8px 24px rgba(0, 0, 0, 0.35));
  border: 1px solid var(--orbit-editor-border);
}

.icon-picker-panel {
  position: relative;
  width: 100%;
  max-width: 100%;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-sizing: border-box;
}

.icon-picker-panel ha-icon-picker,
.icon-picker-panel ha-generic-picker {
  display: block;
  width: 100%;
}

.icon-picker-panel ha-icon-picker {
  --ha-icon-picker-width: 100%;
  --ha-icon-picker-max-width: 100%;
}

.icon-picker-panel ha-generic-picker {
  --ha-generic-picker-width: min(360px, calc(100vw - 48px));
  --ha-generic-picker-max-width: min(360px, calc(100vw - 48px));
}

.file-picker-preview {
  display: inline-flex;
  flex: none;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  line-height: 0;
  color: var(--secondary-text-color);
}

.file-picker-preview-inner {
  display: inline-flex;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  line-height: 0;
  color: inherit;
}

.file-picker-preview-inner svg,
.file-picker-preview-inner img {
  display: block;
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
  max-width: 24px !important;
  max-height: 24px !important;
  object-fit: contain;
}

.file-picker-preview-inner img {
  filter: brightness(0) opacity(0.72);
}

.file-picker-preview-inner img.dark {
  filter: brightness(0) invert(0.72);
}

.icon-tabs {
  display: flex;
  align-items: end;
  gap: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--orbit-editor-border);
  overflow-x: auto;
}

.icon-tabs button {
  border: 0;
  border-bottom: 3px solid transparent;
  border-radius: 0;
  min-width: 92px;
  height: 34px;
  padding: 0 12px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.62;
}

.icon-tabs button.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  opacity: 1;
}

.file-icon-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  overflow: hidden;
  background: var(--orbit-editor-popover);
}

.file-icon-section + .file-icon-section {
  margin-top: 10px;
}

.file-icon-section-title {
  margin: 0 0 6px;
  font-size: var(--ha-font-size-s, 12px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.62;
  text-transform: uppercase;
}

.icon-popover {
  max-height: 320px;
  overflow: auto;
}

.file-icon-option {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  min-height: 54px;
  padding: 10px 14px;
  border: 0;
  border-radius: 0;
  background: var(--orbit-editor-popover);
  color: var(--primary-text-color);
  cursor: pointer;
  font: inherit;
  font-size: var(--ha-font-size-l, 16px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-expanded, 24px);
  text-align: left;
}

.file-icon-option.active {
  background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.18);
}

.file-icon-option:hover {
  background: var(--orbit-editor-control-hover);
}

.file-icon-preview {
  display: inline-flex;
  flex: none;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  max-width: 24px;
  max-height: 24px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  line-height: 0;
  color: var(--secondary-text-color);
}

.file-icon-preview svg,
.file-icon-preview img {
  display: block;
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
  max-width: 24px !important;
  max-height: 24px !important;
  object-fit: contain;
}

.file-icon-option span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-picker-note {
  padding: 10px;
  border-radius: 9px;
  background: var(--orbit-editor-control);
  font-size: var(--ha-font-size-s, 12px);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.76;
}

.icon-picker-note code {
  display: block;
  margin-top: 5px;
  overflow-wrap: anywhere;
}
`;
})), iu, au = e((() => {
	j(), iu = c`
.action-field {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-picker {
  width: 100%;
}

.action-picker ha-generic-picker,
.action-subfield ha-navigation-picker,
.action-subfield ha-service-control,
.action-subfield ha-input,
.action-subfield ha-selector {
  width: 100%;
}

.action-subfield ha-navigation-picker,
.action-subfield ha-service-control,
.action-subfield ha-input {
  display: block;
}

.action-subfield ha-service-control {
  --service-control-padding: 0;
}

.action-picker ha-combo-box-item ha-icon,
.action-picker ha-icon[slot="start"] {
  color: var(--secondary-text-color);
}

.inline-field {
  display: flex;
  align-items: center;
  gap: 10px;
}

.inline-label {
  width: 80px;
  min-width: 80px;

  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.7;
}

.inline-field input {
  flex: 1;
}

.action-subfield {
  align-items: flex-start;
}

.action-subfield .inline-label {
  padding-top: 18px;
}

.action-subfield input {
  min-height: 56px;
}
`;
})), ou, su = e((() => {
	j(), ou = c`
.editor-version {
  padding: 0 14px;
  font-size: var(--ha-font-size-xs, 11px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.5;
  text-align: right;
}
`;
})), cu, lu = e((() => {
	j(), cu = c`
.editor-tabs {
  display: flex;
  align-items: end;
  gap: 10px;
  border-bottom: 1px solid var(--orbit-editor-border);
  overflow-x: auto;
}

.editor-tabs + .editor-tabs {
  margin-top: -12px;
}

.editor-tab {
  min-width: 72px;
  height: 42px;
  padding: 0 12px;
  border: none;
  border-bottom: 3px solid transparent;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.62;
  cursor: pointer;
}

.editor-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  opacity: 1;
}

.editor-segment-menu {
  display: grid;
  grid-template-columns: repeat(
    var(--editor-segment-columns, 3),
    minmax(0, 1fr)
  );
  gap: 6px;
  padding: 6px;
  border-radius: var(--ha-border-radius-xl, 16px);
  background: var(--orbit-editor-surface);
  border: 1px solid var(--orbit-editor-border);
}

.editor-segment-item {
  min-width: 0;
  height: 34px;
  padding: 0 10px;
  border: none;
  border-radius: var(--ha-border-radius-lg, 12px);
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.58;
  cursor: pointer;
}

.editor-segment-item.active {
  background: var(--orbit-editor-active);
  color: var(--primary-color);
  opacity: 1;
}

.selected-button-section {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.sub-section-title {
  margin-bottom: 12px;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.62;
}
`;
})), uu, du = e((() => {
	ql(), Yl(), Zl(), $l(), tu(), ru(), au(), su(), lu(), uu = [
		Kl,
		Jl,
		Xl,
		Ql,
		eu,
		nu,
		iu,
		ou,
		cu
	];
})), fu, pu = e((() => {
	j(), fu = c`
.action-tabs {
  display: flex;
  align-items: end;
  gap: 6px;
  border-bottom: 1px solid var(--orbit-editor-border);
  padding-bottom: 2px;
  margin-bottom: 12px;
  overflow: visible;
}

.action-tabs.scroll-hint .action-tab-items {
  -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 12px), transparent);
  mask-image: linear-gradient(to right, #000 calc(100% - 12px), transparent);
}

.action-tabs.wrapped {
  display: flex;
  align-items: start;
}

.action-tab-items {
  display: flex;
  align-items: end;
  gap: 6px;
  min-width: 0;
  overflow-x: auto;
}

.action-tabs.wrapped .action-tab-items {
  display: grid;
  grid-template-columns: repeat(
    var(--action-tabs-per-row, 3),
    32px
  );
  justify-content: start;
  flex: 1 1 auto;
  overflow-x: auto;
}

.action-tabs-scroll-indicator {
  width: 16px;
  min-width: 16px;
  height: 36px;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  opacity: 0.78;
  pointer-events: none;
}

.action-tabs-scroll-indicator ha-icon {
  --mdc-icon-size: 18px;
}

.action-group-options {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 2px;
}

.action-wrap-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 1;
}

.action-per-row-field {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.9;
}

.action-per-row-field span {
  opacity: 0.78;
}

.action-per-row-field input {
  width: 64px;
  min-width: 64px;
  padding: 7px 8px;
  text-align: center;
}

.action-tab,
.action-tab-add {
  border: none;
  background: transparent;
  color: inherit;
  width: 32px;
  min-width: 32px;
  height: 36px;
  padding: 0;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.6;
  cursor: pointer;
}

.action-tab.active {
  color: var(--primary-color);
  opacity: 1;
  border-bottom: 3px solid var(--primary-color);
}

.action-tabs.wrapped .action-tab,
.action-tabs.wrapped .action-tab-add {
  width: 32px;
  min-width: 32px;
}

.action-editor-tools .action-tab-add {
  width: 34px;
  min-width: 34px;
  height: 34px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);
  background: var(--orbit-editor-control);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}

.action-tab-add {
  font-size: 24px;
  opacity: 0.9;
}

.action-editor-tools {
  display: flex;
  gap: 4px;
  margin-left: auto;
  justify-content: flex-end;
}

.action-tabs.scroll-hint .action-editor-tools {
  margin-left: 0;
}

.action-tabs.wrapped .action-editor-tools {
  display: grid;
  grid-template-columns: repeat(2, 34px);
  grid-template-rows: repeat(2, 34px);
  gap: 4px;
  min-width: max-content;
  align-self: start;
}

.action-domain-filters {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  margin: 0 0 10px;
}

.action-domain-filters button {
  flex: 1 1 auto;
  min-width: fit-content;
  min-height: 32px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);
  padding: 0 8px;
  background: var(--orbit-editor-control);
  color: inherit;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  white-space: nowrap;
  cursor: pointer;
}

.action-domain-filters button.active {
  border-color: var(--primary-color);
  background: var(--orbit-editor-active);
  color: var(--primary-color) !important;
  box-shadow: inset 0 0 0 1px var(--primary-color);
  font-weight: var(--ha-font-weight-medium, 500);
}

.action-tool-button {
  width: 34px;
  height: 34px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);
  background: var(--orbit-editor-control);
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-tool-button:disabled {
  opacity: 0.35;
  cursor: default;
}

.action-tool-button ha-icon {
  --mdc-icon-size: 20px;
}
`;
})), Z, Q = e((() => {
	Z = {
		room: "0.7.4",
		status: "0.12.7",
		action: "0.5.7"
	};
})), mu = /* @__PURE__ */ t((() => {
	j(), Al(), Ml(), Il(), Gl(), du(), pu(), R(), B(), Q();
	var e = class extends A {
		static svgCache = L;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_activeSection: { state: !0 },
			_selectedStatusIndex: { state: !0 },
			_selectedButtonIndex: { state: !0 },
			_selectedCurveButtonIndex: { state: !0 },
			_colorPickerKey: { state: !0 },
			_colorPickerTab: { state: !0 },
			_iconPickerKey: { state: !0 },
			_iconPickerTab: { state: !0 },
			_iconFileSearch: { state: !0 },
			_iconFilePickerOpen: { state: !0 },
			_orbitIconFiles: { state: !0 },
			_orbitIconFilesLoading: { state: !0 },
			_localIconFiles: { state: !0 },
			_localIconFilesLoading: { state: !0 }
		};
		constructor() {
			super(), this._config = this._config || {}, this._activeSection = "card", this._selectedStatusIndex = 1, this._selectedButtonIndex = 1, this._selectedCurveButtonIndex = 1, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._iconFileSearch = "", this._iconFilePickerOpen = !1, this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1;
		}
		connectedCallback() {
			super.connectedCallback(), vl(this);
		}
		disconnectedCallback() {
			yl(this), super.disconnectedCallback();
		}
		_getColorStyle(e) {
			return xl(e);
		}
		_getColorPickerValue(e) {
			return Sl(e);
		}
		_t(e, t) {
			return z(this.hass, e, t);
		}
		setConfig(e) {
			this._config = e || {};
		}
		_updateConfig(e) {
			this._config = c(kc(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: this._config },
				bubbles: !0,
				composed: !0
			}));
		}
		_handleInput(e, t) {
			this._updateConfig({ [e]: t.target.value });
		}
		_handleEntityUpdate(e, t) {
			if (t) {
				this._handleConfigUpdate(e, t);
				return;
			}
			if (e.startsWith("button")) {
				this._clearButtonEntity(e);
				return;
			}
			if (e.startsWith("curve_button")) {
				this._clearCurveButtonEntity(e);
				return;
			}
			if (e === "action_button") {
				this._clearActionButtonEntity(e);
				return;
			}
			if (/^status[1-3]$/.test(e)) {
				this._clearStatusEntity(e);
				return;
			}
			if (e !== "main_entity") {
				this._handleConfigUpdate(e, t);
				return;
			}
			this._updateConfig(q("main_entity", n));
		}
		_clearStatusEntity(e) {
			this._updateConfig(Ac(e, r));
		}
		_clearButtonEntity(e) {
			this._updateConfig(Ac(e, i));
		}
		_clearCurveButtonEntity(e) {
			this._updateConfig(Ac(e, a));
		}
		_clearActionButtonEntity(e) {
			this._updateConfig(Ac(e, o));
		}
		_renderInput(e, t, n = "") {
			return Ec.call(this, e, t, n);
		}
		_renderTemplateInput(e, t) {
			return Dc.call(this, e, t);
		}
		_handleConfigUpdate(e, t) {
			this._updateConfig({ [e]: t });
		}
		_renderColor(e, t) {
			return Fc.call(this, e, t);
		}
		_renderColorControl(e, t, n, r, i = n) {
			return Ic.call(this, e, t, n, r, i);
		}
		_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
			return $s.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return ec.call(this, e);
		}
		_isImageIcon(e) {
			return Xs(e);
		}
		_resolveIconPath(e) {
			return Zs(e);
		}
		_getInlineSvg(e) {
			return F.call(this, e, { forceColor: !0 });
		}
		_renderActionSelector(e, t, n) {
			return $c.call(this, e, t, n);
		}
		_renderEntity(e, t) {
			return dl.call(this, e, t);
		}
		_renderArea(e, t) {
			return fl.call(this, e, t);
		}
		_renderRoomSection() {
			return jl.call(this);
		}
		_renderStatusSection() {
			let e = this._selectedStatusIndex || 1;
			return w`
      <div class="section">
        ${this._renderInput("Separator", "status_separator", "|")}

        <div
          class="editor-segment-menu"
          style="--editor-segment-columns: 3;"
        >
          ${[
				1,
				2,
				3
			].map((t) => w`
            <button
              type="button"
              class="editor-segment-item ${e === t ? "active" : ""}"
              @click=${() => {
				this._selectedStatusIndex = t;
			}}
            >
              ${this._t("Status {index}", { index: t })}
            </button>
          `)}
        </div>

        <div class="sub-section selected-button-section">
          ${this._renderEntity("Entity", `status${e}`)}

          ${this._renderIconInput("Prefix Icon", `status${e}_icon`, "mdi:thermometer / icon.svg / 🌡️")}

          ${this._renderInput("Decimal Places", `status${e}_decimal_places`, "entity default")}
        </div>
      </div>
    `;
		}
		_renderButtonsSection() {
			return Nl.call(this);
		}
		_renderCurvedButtonsSection() {
			return Ll.call(this);
		}
		_renderActionButtonSection() {
			return Rl.call(this);
		}
		_renderEditorTabs() {
			return w`
      <div class="editor-tabs">
        ${t.map((e) => w`
          <button
            type="button"
            class="editor-tab ${this._activeSection === e.key ? "active" : ""}"
            @click=${() => {
				this._activeSection = e.key;
			}}
          >
            ${this._t(e.label)}
          </button>
        `)}
      </div>
    `;
		}
		_renderActiveSection() {
			let e = t.find((e) => e.key === this._activeSection) || t[0];
			return this[e.render]();
		}
		render() {
			return w`
      <div class="wrapper">
        ${this._renderEditorTabs()}
        ${this._renderActiveSection()}
        <div class="editor-version">
          ${this._t("Orbit Room Card v{version}", { version: Z.room })}
        </div>
      </div>
    `;
		}
		static styles = [uu, fu];
	}, t = [
		{
			key: "card",
			label: "Card",
			render: "_renderRoomSection"
		},
		{
			key: "status",
			label: "Status",
			render: "_renderStatusSection"
		},
		{
			key: "buttons",
			label: "Buttons",
			render: "_renderButtonsSection"
		},
		{
			key: "curve",
			label: "Curve Buttons",
			render: "_renderCurvedButtonsSection"
		},
		{
			key: "action",
			label: "Action Button",
			render: "_renderActionButtonSection"
		}
	];
	customElements.define("orbit-room-card-editor", e);
	var n = [
		"main_entity_icon",
		"main_entity_icon_on",
		"main_entity_icon_off",
		"main_entity_tap_action",
		"main_entity_hold_action"
	], r = ["_icon", "_decimal_places"], i = [
		"_on_color",
		"_off_color",
		"_icon",
		"_icon_on",
		"_icon_off",
		"_state_template",
		"_tap_action",
		"_hold_action"
	], a = [
		"_icon",
		"_icon_on",
		"_icon_off",
		"_state_template",
		"_tap_action",
		"_hold_action"
	], o = [
		"_icon",
		"_icon_on",
		"_icon_off",
		"_state_template",
		"_tap_action",
		"_hold_action"
	], s = [
		"type",
		"room_name",
		"accent_color",
		"status_color",
		"area",
		"navigate",
		"main_entity",
		"main_entity_icon",
		"main_entity_icon_on",
		"main_entity_icon_off",
		"main_entity_icon_svg_color_override",
		"main_entity_icon_on_svg_color_override",
		"main_entity_icon_off_svg_color_override",
		"main_entity_tap_action",
		"main_entity_hold_action",
		"status_separator",
		...[
			1,
			2,
			3
		].flatMap((e) => [
			`status${e}`,
			`status${e}_icon`,
			`status${e}_decimal_places`
		]),
		...[
			1,
			2,
			3,
			4
		].flatMap((e) => [
			`button${e}`,
			`button${e}_on_color`,
			`button${e}_off_color`,
			`button${e}_icon`,
			`button${e}_icon_on`,
			`button${e}_icon_off`,
			`button${e}_icon_svg_color_override`,
			`button${e}_icon_on_svg_color_override`,
			`button${e}_icon_off_svg_color_override`,
			`button${e}_state_template`,
			`button${e}_tap_action`,
			`button${e}_hold_action`
		]),
		"curve_buttons_lock_position",
		...[
			1,
			2,
			3,
			4,
			5,
			6
		].flatMap((e) => [
			`curve_button${e}`,
			`curve_button${e}_icon`,
			`curve_button${e}_icon_on`,
			`curve_button${e}_icon_off`,
			`curve_button${e}_icon_svg_color_override`,
			`curve_button${e}_icon_on_svg_color_override`,
			`curve_button${e}_icon_off_svg_color_override`,
			`curve_button${e}_state_template`,
			`curve_button${e}_tap_action`,
			`curve_button${e}_hold_action`
		]),
		"action_button",
		"action_button_icon",
		"action_button_icon_on",
		"action_button_icon_off",
		"action_button_icon_svg_color_override",
		"action_button_icon_on_svg_color_override",
		"action_button_icon_off_svg_color_override",
		"action_button_state_template",
		"action_button_tap_action",
		"action_button_hold_action",
		"grid_options",
		"view_layout"
	];
	function c(e) {
		let t = {}, n = /* @__PURE__ */ new Set();
		return s.forEach((r) => {
			Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r], n.add(r));
		}), Object.keys(e).forEach((r) => {
			n.has(r) || (t[r] = e[r]);
		}), t;
	}
})), hu = /* @__PURE__ */ t((() => {
	j(), Qe(), P(), pt(), gt(), kt(), Nt(), Ft(), zt(), Ut(), R(), Xo(), is(), cs(), Cs(), Ys(), mu(), Q();
	var e = class extends A {
		static svgCache = L;
		static get properties() {
			return {
				hass: {},
				_config: { type: Object },
				_cardName: { type: String },
				_statusText: { type: String },
				_statusItems: { type: Array },
				_icon: { type: String },
				_roomColor: { type: String },
				_statusColor: { type: String },
				_iconColor: { type: String },
				_circleColor: { type: String }
			};
		}
		static getConfigElement() {
			return document.createElement("orbit-room-card-editor");
		}
		static getStubConfig() {
			return {
				type: "custom:orbit-room-card",
				accent_color: "blue",
				navigation_path: "/lovelace/home"
			};
		}
		getLayoutOptions() {
			return {
				grid_columns: 3,
				grid_min_columns: 2
			};
		}
		setConfig(e) {
			this._config = e, this._roomColor = this._computeFullColor(e.accent_color), this._statusColor = this._computeFullColor(e.status_color || e.accent_color), this._iconColor = this._computeIconColor(e.accent_color), this._circleColor = this._computeCircleColor(e.accent_color);
		}
		willUpdate(e) {
			return Fo.call(this, e);
		}
		shouldUpdate(e) {
			return It.call(this, e, this._getRelevantEntities(), { hasTemplates: Lt(this._config) });
		}
		_handleAction(e, t = null) {
			return We.call(this, e, t);
		}
		_navigate(e) {
			return Ke.call(this, e);
		}
		_toggleEntity(e, t, n = null) {
			return qe.call(this, e, t, n);
		}
		_handleButtonClick(e) {
			return Je.call(this, e);
		}
		_handleCurveButtonClick(e) {
			return Ye.call(this, e);
		}
		_handleTap(e) {
			return Xe.call(this, e);
		}
		_handleMainEntityTap(e) {
			return Ze.call(this, e);
		}
		_handleMainEntityPointerDown(e) {
			return this._startLongPress(e, this._config.main_entity || this._config.entity, this._config.main_entity_hold_action);
		}
		_handleButtonPointerDown(e) {
			let t = e.currentTarget;
			return this._startLongPress(e, t.dataEntity, t.dataHoldAction);
		}
		_computeFullColor(e) {
			return $e.call(this, e);
		}
		_computeIconColor(e) {
			return et.call(this, e);
		}
		_computeCircleColor(e) {
			return tt.call(this, e);
		}
		_computeButtonBackground(e) {
			return nt.call(this, e);
		}
		_getCardName(e = "Card") {
			return ft(this._config, this.hass, e);
		}
		formatState(e) {
			return mt(e);
		}
		_getEntityActiveState(e) {
			return ht(e);
		}
		_getMainIconColor(e, t) {
			return _t.call(this, e, t);
		}
		_getEntityColor(e) {
			return vt(e);
		}
		_getBinarySensorIcon(e) {
			return yt(e);
		}
		_getDefaultDomainIcon(e, t = null) {
			return bt.call(this, e, t);
		}
		_isImageIcon(e) {
			return xt(e);
		}
		_resolveIconPath(e) {
			return St(e);
		}
		_getInlineSvg(e, t = !0) {
			return F.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e) {
			return wt(this._config, e);
		}
		get _LONG_PRESS_DELAY() {
			return 500;
		}
		_startLongPress(e, t, n) {
			return At.call(this, e, t, n);
		}
		_cancelLongPress() {
			return jt.call(this);
		}
		_finishLongPress(e) {
			return Mt.call(this, e);
		}
		_evaluateStateTemplate(e, t) {
			return Pt.call(this, e, t);
		}
		_getRelevantEntities() {
			return [
				this._config?.main_entity,
				this._config?.entity,
				this._config?.status1,
				this._config?.status2,
				this._config?.status3,
				this._config?.button1,
				this._config?.button2,
				this._config?.button3,
				this._config?.button4,
				this._config?.curve_button1,
				this._config?.curve_button2,
				this._config?.curve_button3,
				this._config?.curve_button4,
				this._config?.curve_button5,
				this._config?.curve_button6,
				this._config?.action_button
			];
		}
		_renderButtons(e) {
			return rs.call(this, e);
		}
		_renderCurveButtons() {
			return xs.call(this);
		}
		render() {
			return as.call(this);
		}
		static styles = Js;
	};
	customElements.define("orbit-room-card", e), window.customCards = window.customCards || [], window.customCards.push({
		type: "orbit-room-card",
		name: "Orbit Room Card",
		description: "Responsive room card",
		preview: !0,
		version: Z.room,
		getEntitySuggestion: n
	}), console.info(`%c Orbit Room Card %c v${Z.room} `, "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;", "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;");
	var t = new Set([
		"light",
		"fan",
		"climate",
		"media_player",
		"switch",
		"cover",
		"lock"
	]);
	function n(e, n) {
		let r = Bt(n);
		if (!t.has(r)) return null;
		let i = Vt(e, n), a = {
			type: "custom:orbit-room-card",
			main_entity: n,
			accent_color: r === "light" ? "light" : "theme"
		};
		return i && (a.area = i), { config: a };
	}
}));
//#endregion
//#region src/cards/status/helpers/attributes.js
function $(e, t) {
	let n = e?.attributes?.[t];
	return n == null || typeof n == "string" && n.trim() === "" ? null : n;
}
function gu(e) {
	let t = e.navigate?.navigation_path;
	return typeof t == "string" && t.trim() || null;
}
function _u(e, t, n) {
	let r = $(t, "color");
	return n ? e.accent_on_color || r || "theme" : e.accent_off_color || r || "theme";
}
function vu(e, t = null, n = null) {
	if (!e) return !1;
	let r = (n ?? e.state)?.toString().trim().toLowerCase(), i = Number(r);
	if (Number.isFinite(i)) return i > 0;
	if (bu.includes(r)) return !1;
	let a = e.entity_id?.split(".")[0];
	return [
		"sensor",
		"input_text",
		"input_select",
		"select"
	].includes(a) ? !0 : typeof t == "function" ? t(e) : !0;
}
function yu(e, t) {
	let n = $(t, "navigation"), r = typeof n == "string" ? n.trim() : n?.navigation_path;
	return gu(e) || r || "/lovelace/home";
}
var bu, xu = e((() => {
	bu = [
		"",
		"0",
		"off",
		"false",
		"no",
		"none",
		"unknown",
		"unavailable",
		"idle",
		"standby",
		"docked",
		"disarmed",
		"closed",
		"locked",
		"clear",
		"cleared",
		"normal",
		"ok",
		"okay",
		"safe",
		"home",
		"online",
		"connected",
		"available",
		"disabled"
	];
}));
//#endregion
//#region src/common/helpers/zones.js
function Su(e) {
	let t = e?.states;
	if (!t) return {
		zones: [],
		zoneByTrackerState: /* @__PURE__ */ new Map()
	};
	let n = wu.get(t);
	if (n) return n;
	let r = Object.values(t).filter((e) => e.entity_id?.startsWith("zone.") && !e.attributes?.passive), i = {
		zones: r,
		zoneByTrackerState: new Map(r.map((e) => [Cu(e), e]))
	};
	return wu.set(t, i), i;
}
function Cu(e) {
	return (e.attributes?.friendly_name || e.entity_id.replace(/^zone\./, "")).toLowerCase().replace(/\s+/g, "_");
}
var wu, Tu = e((() => {
	wu = /* @__PURE__ */ new WeakMap();
}));
//#endregion
//#region src/cards/status/helpers/lifecycle.js
function Eu(e) {
	if (!e.has("_config") && !e.has("hass")) return;
	if (this._config.mode === "person") {
		Au.call(this);
		return;
	}
	if (this._config.mode === "icon_only") {
		let e = Du(this._config);
		this._statusItems = e.map((e) => Ou.call(this, e, this._config)), ku.call(this, this._statusItems[0] || {});
		return;
	}
	let t = this._config.main_entity, n = Ou.call(this, { entity: t }, this._config);
	this._statusItems = [n], ku.call(this, n);
}
function Du(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.main_entity,
		accent_on_color: e.accent_on_color,
		accent_off_color: e.accent_off_color,
		main_entity_icon: e.main_entity_icon,
		main_entity_icon_on: e.main_entity_icon_on,
		main_entity_icon_off: e.main_entity_icon_off,
		main_entity_icon_svg_color_override: e.main_entity_icon_svg_color_override,
		main_entity_icon_on_svg_color_override: e.main_entity_icon_on_svg_color_override,
		main_entity_icon_off_svg_color_override: e.main_entity_icon_off_svg_color_override,
		state_template: e.state_template,
		label_template: e.label_template,
		tap_action: e.tap_action,
		main_entity_tap_action: e.main_entity_tap_action,
		main_entity_hold_action: e.main_entity_hold_action
	}];
}
function Ou(e, t = {}) {
	let n = e.entity || t.main_entity, r = n && this.hass ? this.hass.states[n] : null, i = {
		...t,
		...e,
		main_entity: n
	}, a = (i.mode === "icon_only" ? null : i.status_name) || $(r, "friendly_name") || n || z(this.hass, "Status"), o = i.state_template ? this._evaluateStateTemplate(i.state_template, n) : null, s = (i.label_template ? this._evaluateStateTemplate(i.label_template, n) : null) ?? ($(r, "label") || (r ? this.formatState(r) : "")), c = i.main_entity_icon, l = i.main_entity_icon_on, u = i.main_entity_icon_off, d = vu(r, (e) => this._getEntityActiveState(e), o), f = (d ? l : u) || c || $(r, "icon") || (r ? this._getDefaultDomainIcon(r.entity_id.split(".")[0], r) : "mdi:information-outline"), p = d && l ? "main_entity_icon_on" : !d && u ? "main_entity_icon_off" : c ? "main_entity_icon" : "", m = _u(i, r, d), ee = yu(i, r), te = this._computeFullColor(m), ne = this._computeFullColor(m), h = this._computeCircleColor(m), re = d ? this._computeFullColor(m) : this._computeIconColor(m);
	return {
		...e,
		entityId: n,
		cardName: a,
		statusText: s,
		icon: f,
		navigationPath: ee,
		nameColor: te,
		statusColor: ne,
		circleColor: h,
		iconColor: re,
		svgForceColor: p ? this._getSvgColorOverride(i, p) : !0
	};
}
function ku(e) {
	this._cardName = e.cardName || z(this.hass, "Status"), this._statusText = e.statusText || "", this._icon = e.icon || "mdi:information-outline", this._navigationPath = e.navigationPath || "", this._nameColor = e.nameColor || this._nameColor, this._statusColor = e.statusColor || this._statusColor, this._circleColor = e.circleColor || this._circleColor, this._iconColor = e.iconColor || this._iconColor, this._iconSvgForceColor = e.svgForceColor ?? !0;
}
function Au() {
	let e = this._config.main_entity, t = this._config.tracker_entity, n = this._config.eta_entity, r = t && this.hass ? this.hass.states[t] : null, i = e && this.hass ? this.hass.states[e] : null, a = n && this.hass ? this.hass.states[n] : null;
	this._cardName = this._config.status_name || $(i, "friendly_name") || $(r, "friendly_name") || e || t || z(this.hass, "Person");
	let o = (this._config.label_template ? this._evaluateStateTemplate(this._config.label_template, t) : null) ?? (r ? Mu.call(this, r) : ""), s = a && r?.state !== "home" ? this.formatState(a) : "";
	this._statusText = s ? `${o} | ${s}` : o;
	let c = vu(r, (e) => this._getEntityActiveState(e), this._config.state_template ? this._evaluateStateTemplate(this._config.state_template, t) : null), l = _u(this._config, r, c);
	this._personPicture = $(i, "entity_picture") || $(r, "entity_picture") || "", this._personZoneIcon = ju.call(this, r, i), this._personBattery1 = Nu.call(this, this._config.battery_entity_1), this._personBattery2 = Nu.call(this, this._config.battery_entity_2), this._icon = $(i, "icon") || $(r, "icon") || "mdi:account", this._navigationPath = yu(this._config, r), this._nameColor = this._computeFullColor(l), this._statusColor = this._computeFullColor(l), this._circleColor = this._computeCircleColor(l), this._iconColor = c ? this._computeFullColor(l) : this._computeIconColor(l), this._iconSvgForceColor = !0;
}
function ju(e, t) {
	if (e?.state === "home") return "mdi:home-variant";
	let n = Su(this.hass), r = t?.entity_id;
	if (r) {
		let e = n.zones.find((e) => Array.isArray(e.attributes?.persons) && e.attributes.persons.includes(r));
		if (e?.attributes?.icon) return e.attributes.icon;
	}
	let i = e?.state?.toLowerCase();
	if (i && i !== "not_home") {
		let e = n.zoneByTrackerState.get(i);
		if (e?.attributes?.icon) return e.attributes.icon;
	}
	return "mdi:home-minus";
}
function Mu(e) {
	let t = e?.state;
	return t ? t === "home" ? z(this.hass, "Home") : t === "not_home" ? z(this.hass, "Away") : t.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase()) : "";
}
function Nu(e) {
	let t = e && this.hass ? this.hass.states[e] : null;
	if (!t) return null;
	let n = Number(t.state), r = "green";
	return Number.isFinite(n) && (n <= 15 ? r = "red" : n <= 30 && (r = "amber")), {
		entityId: e,
		icon: t.attributes?.icon || "mdi:battery",
		color: this._computeFullColor(r)
	};
}
var Pu = e((() => {
	xu(), Tu(), B();
}));
//#endregion
//#region src/cards/status/renders/status-card.js
function Fu() {
	let e = this._config?.mode || "standard", t = this._statusItems || [], n = e === "icon_only" && t.length > 1, r = Math.max(t.length, 1), i = this._getStatusColumnCount(r), a = this._getStatusRowCount(r), o = Bu(this._statusText), s = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", c = s ? this._getInlineSvg(s, this._iconSvgForceColor) : "";
	return w`
    <ha-card
      class="mode-${e} ${n ? "grouped" : ""} ${n && this._config?.separate_cards ? "separate-cards" : ""}"
      tabindex="0"
      style="
        --status-item-count:${r};
        --status-columns:${i};
        --status-rows:${a};
      "
      @click=${this._handleTap}
    >
      <div
        class="container status-container mode-${e} ${n ? "grouped" : ""}"
        style="
          --status-circle-color:${this._circleColor};
          --status-icon-color:${this._iconColor};
          --status-name-color:${this._nameColor};
          --status-text-color:${this._statusColor};
        "
      >
        ${n ? Iu.call(this, t) : w`
        <div
          class="circle status-circle"
          @pointerdown=${this._handleMainIconPointerDown}
          @pointerup=${this._handleMainIconPointerUp}
          @pointerleave=${this._handleMainIconPointerCancel}
          @pointercancel=${this._handleMainIconPointerCancel}
          @touchstart=${this._handleMainIconPointerDown}
          @touchend=${this._handleMainIconPointerUp}
          @touchcancel=${this._handleMainIconPointerCancel}
          @click=${this._handleMainIconClick}
          @contextmenu=${this._handleMainIconContextMenu}
        >
          ${e === "person" ? Ru.call(this) : this._isImageIcon(this._icon) ? w`
                <div
                  class="main-image-icon"
                >
                  ${c ? V(c) : w`<img src=${s} alt="" />`}
                </div>
              ` : w`
                <ha-icon
                  class="main-icon"
                  .icon=${this._icon}
                ></ha-icon>
            `}
        </div>

        ${e === "icon_only" ? w`
              <div
                class="status-badge"
                ?hidden=${!o}
              >
                ${o}
              </div>
            ` : w`
              <div class="content">
                <div class="header">
                  <div class="card-name">
                    ${this._cardName}
                  </div>

                  <div class="status">
                    ${this._statusText || ""}
                  </div>
                </div>
              </div>
            `}
          `}
      </div>
    </ha-card>
  `;
}
function Iu(e) {
	return w`
    <div class="status-icon-grid">
      ${e.map((e, t) => Lu.call(this, e, t))}
    </div>
  `;
}
function Lu(e, t) {
	let n = Bu(e.statusText), r = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", i = r ? this._getInlineSvg(r, e.svgForceColor) : "";
	return w`
    <div
      class="status-icon-item"
      style="
        --status-circle-color:${e.circleColor};
        --status-icon-color:${e.iconColor};
      "
      @click=${(e) => this._handleStatusItemClick(e, t)}
      @pointerdown=${(e) => this._handleStatusItemPointerDown(e, t)}
      @pointerup=${this._handleStatusItemPointerUp}
      @pointerleave=${this._handleStatusItemPointerCancel}
      @pointercancel=${this._handleStatusItemPointerCancel}
      @contextmenu=${(e) => this._handleStatusItemContextMenu(e, t)}
    >
      <div class="circle status-circle">
        ${this._isImageIcon(e.icon) ? w`
              <div class="main-image-icon">
                ${i ? V(i) : w`<img src=${r} alt="" />`}
              </div>
            ` : w`
              <ha-icon
                class="main-icon"
                .icon=${e.icon}
              ></ha-icon>
            `}
      </div>

      <div
        class="status-badge"
        ?hidden=${!n}
      >
        ${n}
      </div>
    </div>
  `;
}
function Ru() {
	return w`
    <div class="person-main-icon">
      ${this._personPicture ? w`
            <img
              class="person-picture"
              src=${this._personPicture}
              alt=""
            />
          ` : w`
          <ha-icon
            class="person-fallback-icon"
            .icon=${this._icon || "mdi:account"}
          ></ha-icon>
          `}

      ${zu.call(this, "zone", this._personZoneIcon || "mdi:home-minus", this._computeFullColor("blue"))}

      ${this._personBattery1 ? zu.call(this, "battery-1", this._personBattery1.icon, this._personBattery1.color, this._personBattery1.entityId) : ""}

      ${this._personBattery2 ? zu.call(this, "battery-2", this._personBattery2.icon, this._personBattery2.color, this._personBattery2.entityId) : ""}
    </div>
  `;
}
function zu(e, t, n, r = null) {
	return w`
    <span
      class="person-badge person-badge-${e} ${r ? "clickable" : ""}"
      style="background:${n}"
      .dataEntity=${r}
      @pointerdown=${this._handlePersonBadgeStop}
      @pointerup=${this._handlePersonBadgePointerUp}
      @pointerleave=${this._handlePersonBadgeStop}
      @pointercancel=${this._handlePersonBadgeStop}
      @touchstart=${this._handlePersonBadgeStop}
      @touchend=${this._handlePersonBadgeStop}
      @touchcancel=${this._handlePersonBadgeStop}
      @click=${this._handlePersonBadgeClick}
    >
      <span class="person-badge-icon">
        <ha-icon .icon=${t}></ha-icon>
      </span>
    </span>
  `;
}
function Bu(e) {
	let t = String(e || "").match(/-?\d+(?:\.\d+)?/);
	return (t ? Number(t[0]) : null) === 0 ? "" : t?.[0] || "";
}
var Vu = e((() => {
	j(), H();
})), Hu, Uu = e((() => {
	j(), Ts(), Ds(), ks(), Hu = [
		ws,
		Es,
		Os,
		c`
  ha-card {
    aspect-ratio: 3 / 1;
    border-radius: 15px;
  }

  ha-card.mode-icon_only {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped {
    aspect-ratio: auto;
    container-type: inline-size;
  }

  ha-card.mode-icon_only.grouped.separate-cards {
    background: transparent;
    box-shadow: none;
  }

  ha-card.mode-person {
    aspect-ratio: 3 / 1;
  }

  .status-container {
    --status-circle-color: rgba(var(--color-theme),0.05);
    --status-icon-color: rgba(var(--color-theme),0.4);
    --status-name-color: rgb(var(--color-theme));
    --status-text-color: rgb(var(--color-theme));
    overflow: hidden;
  }

  .status-circle {
    background: var(--status-circle-color);
    position: absolute;
    left: -8%;
    top: 18%;
    width: 34%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    pointer-events: auto;
    touch-action: manipulation;
    z-index: 3;
  }

  .status-circle .main-icon {
    --mdc-icon-size: 45%;
    color: var(--status-icon-color);
  }

  .status-circle .main-image-icon {
    width: 45%;
    height: 45%;
    color: var(--status-icon-color);
  }

  .status-container .content {
    justify-content: center;
    padding-left: 31%;
    pointer-events: none;
  }

  .status-container .status {
    color: var(--status-text-color);
    font-size: clamp(16px, 8cqw, 32px);
  }

  .status-container .card-name {
    color: var(--status-name-color);
  }

  .status-container.mode-icon_only .status-circle {
    left: -12%;
    top: auto;
    bottom: -12%;
    width: 82%;
    transform: none;
  }

  .status-container.mode-icon_only.grouped {
    display: grid;
    padding: 0;
  }

  .status-icon-grid {
    display: grid;
    grid-template-columns: repeat(var(--status-columns, 1), minmax(0, 1fr));
    grid-auto-rows: minmax(0, 1fr);
    align-content: start;
    gap: clamp(4px, 2cqw, 10px);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .status-container.mode-icon_only.grouped .status-icon-grid {
    grid-auto-rows: auto;
    height: auto;
  }

  ha-card.mode-icon_only.grouped.separate-cards .status-icon-grid {
    gap: clamp(5px, 1.4cqw, 8px);
    padding: 0 2px 4px;
  }

  .status-icon-item {
    background: var(--ha-card-background, var(--card-background-color));
    border-radius: 15px;
    container-type: size;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .status-container.mode-icon_only.grouped .status-icon-item {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped.separate-cards .status-icon-item {
    box-shadow: var(--ha-card-box-shadow, 0 1px 3px 0 rgba(0, 0, 0, 0.14));
  }

  .status-icon-item .status-circle {
    left: -12%;
    top: auto;
    bottom: -12%;
    width: 82%;
  }

  .status-container.mode-icon_only .status-circle .main-icon {
    --mdc-icon-size: 54%;
  }

  .status-container.mode-icon_only .status-circle .main-image-icon {
    width: 54%;
    height: 54%;
  }

  .status-container.mode-person .status-circle {
    overflow: visible;
  }

  .status-container.mode-person .person-main-icon {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .status-container.mode-person .person-picture,
  .status-container.mode-person .person-fallback-icon {
    width: 100%;
    height: 100%;
  }

  .status-container.mode-person .person-picture {
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }

  .status-container.mode-person .person-fallback-icon {
    --mdc-icon-size: 100%;
    color: var(--status-icon-color);
  }

  .person-badge {
    --person-badge-size: clamp(16px, 18%, 40px);
    --person-badge-ring: clamp(2px, 0.55cqw, 4px);
    position: absolute;
    width: var(--person-badge-size);
    height: var(--person-badge-size);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 var(--person-badge-ring) var(--ha-card-background, var(--card-background-color));
    transform: translate(-50%, -50%);
    z-index: 5;
    pointer-events: none;
  }

  .person-badge.clickable {
    pointer-events: auto;
    cursor: pointer;
  }

  .person-badge-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .person-badge ha-icon {
    --mdc-icon-size: 92%;
    width: 92%;
    height: 92%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: none;
    color: var(--primary-background-color);
  }

  .person-badge-zone {
    left: 37%;
    top: 4%;
    z-index: 6;
  }

  .person-badge-zone ha-icon {
    transform: none;
  }

  .person-badge-battery-1 {
    left: 69%;
    top: 4%;
  }

  .person-badge-battery-2 {
    left: 91%;
    top: 22%;
  }

  .status-badge {
    background: var(--status-circle-color);
    color: var(--status-icon-color);
    position: absolute;
    top: 5%;
    right: 5%;
    min-width: clamp(20px, 36cqw, 80px);
    height: clamp(20px, 36cqw, 80px);
    padding: 0 clamp(3px, 7cqw, 18px);
    border-radius: 999px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(17px, 23cqw, 52px);
    font-weight: bold;
    line-height: 1;
    white-space: nowrap;
    z-index: 4;
    pointer-events: none;
  }

  .status-badge[hidden] {
    display: none;
  }
`
	];
}));
//#endregion
//#region src/editors/status/sections/status.js
function Wu() {
	let e = this._config?.mode || "standard", t = e === "icon_only", n = e === "person", r = t || n ? "more-info" : "navigate", i = this._config?.tap_action?.action || r, a = t || n ? i : "more-info";
	return w`
    <div class="section">
      <div class="field">
        <label>${this._t("Mode")}</label>

        <select
          .value=${this._config?.mode || "standard"}
          @change=${(e) => this._updateConfig({ mode: e.target.value })}
        >
          <option value="standard">${this._t("Standard")}</option>
          <option value="icon_only">${this._t("Icon Only")}</option>
          <option value="person">${this._t("Person")}</option>
        </select>
      </div>
    </div>

    ${t ? Gu.call(this, {
		cardActionDefault: r,
		mainEntityActionDefault: a
	}) : w`
          <div class="section">
            ${n ? w`
                  ${this._renderEntity("Person Entity", "main_entity")}
                  ${this._renderEntity("Tracker Entity", "tracker_entity")}
                  ${this._renderEntity("ETA Entity", "eta_entity")}
                  ${this._renderEntity("Battery Entity 1", "battery_entity_1")}
                  ${this._renderEntity("Battery Entity 2", "battery_entity_2")}
                  <div class="color-pair">
                    ${this._renderColor("Accent ON Color", "accent_on_color")}
                    ${this._renderColor("Accent OFF Color", "accent_off_color")}
                  </div>
                ` : w`
                  ${this._renderInput("Status Name", "status_name")}
                  ${this._renderEntity("Main Entity", "main_entity")}
                  <div class="color-pair">
                    ${this._renderColor("Accent ON Color", "accent_on_color")}
                    ${this._renderColor("Accent OFF Color", "accent_off_color")}
                  </div>
                  ${this._renderIconInput("Main Entity Icon", "main_entity_icon")}
                  <div class="icon-pair">
                    ${this._renderIconInput("Main Entity ON Icon", "main_entity_icon_on")}
                    ${this._renderIconInput("Main Entity OFF Icon", "main_entity_icon_off")}
                  </div>
                  ${this._renderInput("State Template", "state_template")}
                  ${this._renderInput("Label Template", "label_template")}
                `}

            ${this._config?.main_entity ? w`
                  ${this._renderActionSelector("Card Action", "tap_action", r)}
                  ${this._renderActionSelector("Main Entity Action", "main_entity_tap_action", a)}
                  ${this._renderActionSelector("Hold Action", "main_entity_hold_action", "none")}
                ` : ""}
          </div>
        `}
  `;
}
function Gu({ cardActionDefault: e, mainEntityActionDefault: t }) {
	let n = this._getStatusItems(), r = Math.min(this._selectedStatusIndex || 0, n.length - 1), i = n[r] || {}, a = Math.max(1, Number(this._config?.items_per_row) || 3), o = !!this._config?.wrap && n.length > a, s = !o && n.length > 6 || o && a > 6;
	return w`
    <div class="section">
      <div class="status-group-options">
        <label class="status-wrap-toggle">
          <span>${this._t("Wrap")}</span>
          <ha-switch
            .checked=${!!this._config?.wrap}
            @change=${(e) => this._updateConfig({
		wrap: e.target.checked,
		items_per_row: e.target.checked ? this._config?.items_per_row || 3 : this._config?.items_per_row
	})}
          ></ha-switch>
        </label>

        ${n.length > 1 ? w`
              <label class="status-wrap-toggle">
                <span>${this._t("Separate Cards")}</span>
                <ha-switch
                  .checked=${!!this._config?.separate_cards}
                  @change=${(e) => this._updateConfig({ separate_cards: e.target.checked })}
                ></ha-switch>
              </label>
            ` : ""}

      ${this._config?.wrap ? w`
            <label class="status-per-row-field">
              <span>${this._t("Items Per Row")}</span>

              <input
                type="number"
                min="1"
                step="1"
                .value=${String(this._config?.items_per_row || 3)}
                @input=${(e) => this._updateConfig({ items_per_row: Math.max(1, Number(e.target.value) || 1) })}
              />
            </label>
          ` : ""}
      </div>

      <div
        class="status-tabs ${o ? "wrapped" : ""} ${s ? "scroll-hint" : ""} ${n.length > 1 ? "has-tools" : ""}"
        style=${o ? `--status-tabs-per-row: ${a};` : ""}
      >
        <div class="status-tab-items">
          ${n.map((e, t) => w`
            <button
              type="button"
              class="status-tab ${t === r ? "active" : ""}"
              @click=${() => this._selectStatusItem(t)}
            >
              ${t + 1}
            </button>
          `)}
        </div>

        ${s ? w`
              <div class="status-tabs-scroll-indicator" aria-hidden="true">
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </div>
            ` : ""}

        <div class="status-editor-tools">
          <button
            type="button"
            class="status-tab-add"
            title=${this._t("Add")}
            @click=${() => this._addStatusItem()}
          >
            +
          </button>

          ${n.length > 1 ? w`
                <button
                  type="button"
                  class="status-tool-button status-tool-remove"
                  title=${this._t("Remove")}
                  @click=${() => this._removeStatusItem(r)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>

                <button
                  type="button"
                  class="status-tool-button"
                  title=${this._t("Move left")}
                  ?disabled=${r === 0}
                  @click=${() => this._moveStatusItem(r, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="status-tool-button"
                  title=${this._t("Move right")}
                  ?disabled=${r === n.length - 1}
                  @click=${() => this._moveStatusItem(r, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>
              ` : ""}
        </div>
      </div>

      <div class="field">
        <label>${this._t("Main Entity")}</label>

        <div class="entity-row">
          <ha-selector
            class="entity-picker"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${i.entity || ""}
            @value-changed=${(e) => this._updateStatusItem(r, { entity: e.detail.value || "" })}
          ></ha-selector>

          ${i.entity ? w`
                <button
                  type="button"
                  class="clear-button"
                  @click=${() => this._updateStatusItem(r, { entity: "" })}
                >
                  ✕
                </button>
              ` : ""}
        </div>
      </div>

      <div class="color-pair">
        ${qu.call(this, "Accent ON Color", "accent_on_color", r, i)}
        ${qu.call(this, "Accent OFF Color", "accent_off_color", r, i)}
      </div>

      ${this._renderStatusItemIconInput("Main Entity Icon", "main_entity_icon", r)}
      <div class="icon-pair">
        ${this._renderStatusItemIconInput("Main Entity ON Icon", "main_entity_icon_on", r)}
        ${this._renderStatusItemIconInput("Main Entity OFF Icon", "main_entity_icon_off", r)}
      </div>

      ${Ku.call(this, "State Template", "state_template", r, i)}
      ${Ku.call(this, "Label Template", "label_template", r, i)}

      ${i.entity ? w`
            ${this._renderStatusItemActionSelector("Card Action", "tap_action", r, e)}
            ${this._renderStatusItemActionSelector("Main Entity Action", "main_entity_tap_action", r, t)}
            ${this._renderStatusItemActionSelector("Hold Action", "main_entity_hold_action", r, "none")}
          ` : ""}
    </div>
  `;
}
function Ku(e, t, n, r) {
	return w`
    <div class="field">
      <label>${this._t(e)}</label>
      <input
        .value=${r[t] || ""}
        @input=${(e) => this._updateStatusItem(n, { [t]: e.target.value })}
      />
    </div>
  `;
}
function qu(e, t, n, r) {
	return this._renderColorControl(e, `status-${n}-${t}`, r[t] || "", (e) => this._updateStatusItem(n, { [t]: e }));
}
var Ju = e((() => {
	j();
})), Yu, Xu = e((() => {
	j(), Yu = c`
.status-wrap-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 1;
}

.status-per-row-field {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.9;
}

.status-per-row-field span {
  opacity: 0.78;
}

.status-per-row-field input {
  width: 64px;
  min-width: 64px;
  padding: 7px 8px;
  text-align: center;
}

.status-group-options {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 2px;
}

.status-tabs {
  display: flex;
  align-items: end;
  gap: 6px;
  border-bottom: 1px solid var(--orbit-editor-border);
  padding-bottom: 2px;
  margin-bottom: 12px;
  overflow: visible;
}

.status-tabs.scroll-hint .status-tab-items {
  -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 12px), transparent);
  mask-image: linear-gradient(to right, #000 calc(100% - 12px), transparent);
}

.status-tabs.wrapped {
  display: flex;
  align-items: start;
}

.status-tab-items {
  display: flex;
  align-items: end;
  gap: 6px;
  min-width: 0;
  overflow-x: auto;
}

.status-tabs.wrapped .status-tab-items {
  display: grid;
  grid-template-columns: repeat(
    var(--status-tabs-per-row, 3),
    32px
  );
  justify-content: start;
  flex: 1 1 auto;
  overflow-x: auto;
}

.status-tabs-scroll-indicator {
  width: 16px;
  min-width: 16px;
  height: 36px;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  opacity: 0.78;
  pointer-events: none;
}

.status-tabs-scroll-indicator ha-icon {
  --mdc-icon-size: 18px;
}

.status-tab,
.status-tab-add {
  border: none;
  background: transparent;
  color: inherit;
  width: 32px;
  min-width: 32px;
  height: 36px;
  padding: 0;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-normal, 20px);
  opacity: 0.6;
  cursor: pointer;
}

.status-tab.active {
  color: var(--primary-color);
  opacity: 1;
  border-bottom: 3px solid var(--primary-color);
}

.status-tabs.wrapped .status-tab,
.status-tabs.wrapped .status-tab-add {
  width: 32px;
  min-width: 32px;
}

.status-editor-tools .status-tab-add {
  width: 34px;
  min-width: 34px;
  height: 34px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);
  background: var(--orbit-editor-control);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}

.status-tab-add {
  font-size: 24px;
  opacity: 0.9;
}

.status-editor-tools {
  display: flex;
  gap: 4px;
  margin-left: auto;
  justify-content: flex-end;
}

.status-tabs.scroll-hint .status-editor-tools {
  margin-left: 0;
}

.status-tabs.wrapped .status-editor-tools {
  display: grid;
  grid-template-columns: repeat(2, 34px);
  grid-template-rows: repeat(2, 34px);
  gap: 4px;
  min-width: max-content;
  align-self: start;
}

.status-tool-button {
  width: 34px;
  height: 34px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-lg, 12px);
  background: var(--orbit-editor-control);
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.status-tool-button:disabled {
  opacity: 0.35;
  cursor: default;
}

.status-tool-button ha-icon {
  --mdc-icon-size: 20px;
}
`;
})), Zu = /* @__PURE__ */ t((() => {
	j(), Al(), Ju(), du(), Xu(), R(), B(), Q();
	var e = class extends A {
		static svgCache = L;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_selectedStatusIndex: { state: !0 },
			_colorPickerKey: { state: !0 },
			_colorPickerTab: { state: !0 },
			_iconPickerKey: { state: !0 },
			_iconPickerTab: { state: !0 },
			_iconFileSearch: { state: !0 },
			_iconFilePickerOpen: { state: !0 },
			_orbitIconFiles: { state: !0 },
			_orbitIconFilesLoading: { state: !0 },
			_localIconFiles: { state: !0 },
			_localIconFilesLoading: { state: !0 }
		};
		constructor() {
			super(), this._config = this._config || {}, this._selectedStatusIndex = 0, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._iconFileSearch = "", this._iconFilePickerOpen = !1, this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1;
		}
		connectedCallback() {
			super.connectedCallback(), vl(this);
		}
		disconnectedCallback() {
			yl(this), super.disconnectedCallback();
		}
		_getColorStyle(e) {
			return xl(e);
		}
		_getColorPickerValue(e) {
			return Sl(e);
		}
		_t(e, t) {
			return z(this.hass, e, t);
		}
		setConfig(e) {
			this._config = e || {}, this._selectedStatusIndex = Math.min(this._selectedStatusIndex || 0, this._getStatusItems(e).length - 1);
		}
		_updateConfig(e) {
			this._config = c(kc(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: this._config },
				bubbles: !0,
				composed: !0
			}));
		}
		_handleInput(e, t) {
			this._updateConfig({ [e]: t.target.value });
		}
		_handleConfigUpdate(e, t) {
			this._updateConfig({ [e]: t });
		}
		_handleEntityUpdate(e, t) {
			if (t) {
				this._handleConfigUpdate(e, t);
				return;
			}
			if (e === "main_entity") {
				this._clearMainEntity();
				return;
			}
			if (e === "tracker_entity") {
				this._updateConfig(q("tracker_entity", a));
				return;
			}
			this._handleConfigUpdate(e, t);
		}
		_clearMainEntity() {
			if (this._config?.mode === "person") {
				this._updateConfig(q("main_entity", i));
				return;
			}
			this._updateConfig(q("main_entity", n));
		}
		_getStatusItems(e = this._config) {
			return Array.isArray(e?.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
				entity: e?.main_entity || "",
				accent_on_color: e?.accent_on_color || "",
				accent_off_color: e?.accent_off_color || "",
				main_entity_icon: e?.main_entity_icon || "",
				main_entity_icon_on: e?.main_entity_icon_on || "",
				main_entity_icon_off: e?.main_entity_icon_off || "",
				state_template: e?.state_template || "",
				label_template: e?.label_template || "",
				tap_action: e?.tap_action,
				main_entity_tap_action: e?.main_entity_tap_action,
				main_entity_hold_action: e?.main_entity_hold_action
			}];
		}
		_selectStatusItem(e) {
			this._selectedStatusIndex = e;
		}
		_addStatusItem() {
			let e = this._getStatusItems();
			this._selectedStatusIndex = e.length, this._updateConfig(K(r, { entities: [...e, { entity: "" }] }));
		}
		_removeStatusItem(e) {
			let t = this._getStatusItems();
			if (t.length <= 1) {
				this._updateConfig(q("main_entity", n));
				return;
			}
			let r = t.filter((t, n) => n !== e);
			this._selectedStatusIndex = Math.max(0, Math.min(e, r.length - 1)), this._updateConfig({ entities: r });
		}
		_moveStatusItem(e, t) {
			let n = this._getStatusItems(), i = e + t;
			if (i < 0 || i >= n.length) return;
			let a = [...n], [o] = a.splice(e, 1);
			a.splice(i, 0, o), this._selectedStatusIndex = i, this._updateConfig(K(r, { entities: a }));
		}
		_updateStatusItem(e, i) {
			let a = this._getStatusItems(), o = {
				...a[e] || {},
				...i
			};
			if (i.entity === "" && t(o), Array.isArray(this._config?.entities)) {
				let t = [...a];
				t[e] = o;
				let n = { entities: t };
				t.length > 1 && Object.assign(n, K(r)), this._updateConfig(n);
				return;
			}
			if (i.entity === "") {
				this._updateConfig(q("main_entity", n));
				return;
			}
			this._updateConfig({
				main_entity: o.entity || "",
				accent_on_color: o.accent_on_color || "",
				accent_off_color: o.accent_off_color || "",
				main_entity_icon: o.main_entity_icon || "",
				main_entity_icon_on: o.main_entity_icon_on || "",
				main_entity_icon_off: o.main_entity_icon_off || "",
				state_template: o.state_template || "",
				label_template: o.label_template || "",
				tap_action: o.tap_action,
				main_entity_tap_action: o.main_entity_tap_action,
				main_entity_hold_action: o.main_entity_hold_action
			});
		}
		_renderInput(e, t, n = "") {
			return Ec.call(this, e, t, n);
		}
		_renderTemplateInput(e, t) {
			return Dc.call(this, e, t);
		}
		_renderColor(e, t) {
			return Fc.call(this, e, t);
		}
		_renderColorControl(e, t, n, r) {
			return Ic.call(this, e, t, n, r);
		}
		_renderEntity(e, t) {
			return dl.call(this, e, t);
		}
		_renderActionSelector(e, t, n) {
			return $c.call(this, e, t, n);
		}
		_renderStatusItemActionSelector(e, t, n, r) {
			let i = this._getStatusItems()[n] || {}, a = {
				hass: this.hass,
				_config: i,
				_t: (e, t) => this._t(e, t),
				requestUpdate: () => this.requestUpdate(),
				_updateConfig: (e) => this._updateStatusItem(n, e)
			};
			return $c.call(a, e, t, r);
		}
		_renderArea(e, t) {
			return fl.call(this, e, t);
		}
		_renderIconInput(e, t, n = "mdi:information-outline or icon.svg") {
			return $s.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return ec.call(this, e);
		}
		_renderStatusItemIconInput(e, t, n, r = "mdi:information-outline or icon.svg") {
			let i = this._getStatusItems()[n] || {}, a = {
				hass: this.hass,
				_config: i,
				_iconPickerPrefix: `status-${n}-icon`,
				_t: (e, t) => this._t(e, t),
				_isImageIcon: (e) => this._isImageIcon(e),
				_resolveIconPath: (e) => this._resolveIconPath(e),
				_getInlineSvg: (e) => this._getInlineSvg(e),
				_loadLocalIconFiles: (e) => this._loadLocalIconFiles(e),
				requestUpdate: () => this.requestUpdate(),
				renderRoot: this.renderRoot,
				_handleConfigUpdate: (e, t) => this._updateStatusItem(n, { [e]: t })
			};
			return Object.defineProperties(a, {
				_iconPickerKey: {
					get: () => this._iconPickerKey,
					set: (e) => {
						this._iconPickerKey = e;
					}
				},
				_iconPickerTab: {
					get: () => this._iconPickerTab,
					set: (e) => {
						this._iconPickerTab = e;
					}
				},
				_localIconFiles: {
					get: () => this._localIconFiles,
					set: (e) => {
						this._localIconFiles = e;
					}
				},
				_orbitIconFiles: {
					get: () => this._orbitIconFiles,
					set: (e) => {
						this._orbitIconFiles = e;
					}
				},
				_localIconFilesLoading: {
					get: () => this._localIconFilesLoading,
					set: (e) => {
						this._localIconFilesLoading = e;
					}
				},
				_orbitIconFilesLoading: {
					get: () => this._orbitIconFilesLoading,
					set: (e) => {
						this._orbitIconFilesLoading = e;
					}
				}
			}), $s.call(a, e, t, r);
		}
		_isImageIcon(e) {
			return Xs(e);
		}
		_resolveIconPath(e) {
			return Zs(e);
		}
		_getInlineSvg(e) {
			return F.call(this, e, { forceColor: !0 });
		}
		_renderStatusSection() {
			return Wu.call(this);
		}
		render() {
			return w`
      <div class="wrapper">
        ${this._renderStatusSection()}
        <div class="editor-version">
          ${this._t("Orbit Status Card v{version}", { version: Z.status })}
        </div>
      </div>
    `;
		}
		static styles = [uu, Yu];
	};
	customElements.define("orbit-status-card-editor", e);
	function t(e) {
		Object.assign(e, K(n));
	}
	var n = [
		"accent_on_color",
		"accent_off_color",
		"main_entity_icon",
		"main_entity_icon_on",
		"main_entity_icon_off",
		"state_template",
		"label_template",
		"tap_action",
		"main_entity_tap_action",
		"main_entity_hold_action"
	], r = ["main_entity", ...n], i = [
		"tracker_entity",
		"eta_entity",
		"battery_entity_1",
		"battery_entity_2",
		"accent_on_color",
		"accent_off_color",
		"tap_action",
		"main_entity_tap_action",
		"main_entity_hold_action"
	], a = ["eta_entity"], o = [
		"entity",
		"accent_on_color",
		"accent_off_color",
		"main_entity_icon",
		"main_entity_icon_on",
		"main_entity_icon_off",
		"main_entity_icon_svg_color_override",
		"main_entity_icon_on_svg_color_override",
		"main_entity_icon_off_svg_color_override",
		"state_template",
		"label_template",
		"tap_action",
		"main_entity_tap_action",
		"main_entity_hold_action"
	], s = /* @__PURE__ */ "type.mode.status_name.main_entity.tracker_entity.eta_entity.battery_entity_1.battery_entity_2.accent_on_color.accent_off_color.main_entity_icon.main_entity_icon_on.main_entity_icon_off.main_entity_icon_svg_color_override.main_entity_icon_on_svg_color_override.main_entity_icon_off_svg_color_override.state_template.label_template.tap_action.main_entity_tap_action.main_entity_hold_action.wrap.items_per_row.separate_cards.entities.grid_options.view_layout".split(".");
	function c(e) {
		let t = {}, n = /* @__PURE__ */ new Set();
		return s.forEach((r) => {
			Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "entities" && Array.isArray(e[r]) ? e[r].map(l) : e[r], n.add(r));
		}), Object.keys(e).forEach((r) => {
			n.has(r) || (t[r] = e[r]);
		}), t;
	}
	function l(e) {
		return !e || typeof e != "object" || Array.isArray(e) ? e : u(e, o);
	}
	function u(e, t) {
		let n = {}, r = /* @__PURE__ */ new Set();
		return t.forEach((t) => {
			Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
		}), Object.keys(e).forEach((t) => {
			r.has(t) || (n[t] = e[t]);
		}), n;
	}
})), Qu = /* @__PURE__ */ t((() => {
	j(), Qe(), P(), gt(), kt(), Nt(), Ft(), zt(), Ut(), R(), B(), Pu(), Vu(), Uu(), Zu(), Q();
	var e = class extends A {
		static svgCache = L;
		static get properties() {
			return {
				hass: {},
				_config: { type: Object },
				_cardName: { type: String },
				_statusText: { type: String },
				_icon: { type: String },
				_nameColor: { type: String },
				_statusColor: { type: String },
				_iconColor: { type: String },
				_circleColor: { type: String },
				_navigationPath: { type: String },
				_personPicture: { type: String },
				_personZoneIcon: { type: String },
				_personBattery1: { type: Object },
				_personBattery2: { type: Object },
				_statusItems: { type: Array }
			};
		}
		static getConfigElement() {
			return document.createElement("orbit-status-card-editor");
		}
		static getStubConfig() {
			return {
				type: "custom:orbit-status-card",
				mode: "standard",
				main_entity: ""
			};
		}
		getLayoutOptions() {
			if (this._config?.mode === "icon_only") {
				let e = Du(this._config).length, t = n(this._config, e);
				return {
					grid_columns: Math.max(1, t),
					grid_min_columns: .5,
					grid_rows: "auto"
				};
			}
			return {
				grid_columns: 3,
				grid_min_columns: 2
			};
		}
		setConfig(e) {
			this._config = e;
			let t = e.accent_off_color || "theme";
			this._nameColor = this._computeFullColor(t), this._statusColor = this._computeFullColor(t), this._iconColor = this._computeIconColor(t), this._circleColor = this._computeCircleColor(t), this._statusItems = [];
		}
		willUpdate(e) {
			return Eu.call(this, e);
		}
		shouldUpdate(e) {
			return It.call(this, e, this._getRelevantEntities(), {
				hasTemplates: Lt(this._config),
				includeZones: this._config?.mode === "person"
			});
		}
		_handleAction(e, t = null) {
			return We.call(this, e, t);
		}
		_handleTap(e) {
			if (this._shouldSuppressMainIconTap(e)) {
				this._stopEvent(e);
				return;
			}
			if (this._isMainIconEvent(e)) {
				this._handleMainEntityTap(e);
				return;
			}
			this._stopEvent(e), this._handleCardTapAction();
		}
		_isMainIconEvent(e) {
			if (e.composedPath().some((e) => e?.classList && (e.classList.contains("circle") || e.classList.contains("status-circle") || e.classList.contains("main-icon") || e.classList.contains("main-image-icon")))) return !0;
			let t = (this.shadowRoot?.querySelector(".status-circle"))?.getBoundingClientRect();
			return t ? e.clientX >= t.left && e.clientX <= t.right && e.clientY >= t.top && e.clientY <= t.bottom : !1;
		}
		_handleMainEntityTap(e) {
			if (this._shouldSuppressMainIconTap(e)) {
				this._stopEvent(e);
				return;
			}
			if (this._longPressTriggered) {
				this._longPressTriggered = !1, this._stopEvent(e);
				return;
			}
			this._stopEvent(e);
			let t = this._config.main_entity;
			if (!t) return;
			let n = this._getMainEntityTapAction();
			if (n) {
				this._handleAction(n, t);
				return;
			}
			this._handleCardTapAction();
		}
		_handleCardTapAction() {
			let e = this._getCardTapAction(), t = this._config.main_entity;
			if (e.action && e.action !== "navigate") {
				this._handleAction(e, t);
				return;
			}
			this._navigate(e.navigation_path || this._navigationPath || "/lovelace/home");
		}
		_handleStatusItemClick(e, t = 0) {
			if (this._statusItemLongPressTriggered) {
				this._statusItemLongPressTriggered = !1, this._stopEvent(e);
				return;
			}
			this._stopEvent(e);
			let n = this._getStatusItemEntityId(t);
			if (!n) return;
			let r = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityTapAction(t) : this._getStatusItemCardTapAction(t);
			r?.action !== "none" && this._handleAction(r?.action ? r : { action: "more-info" }, n);
		}
		_handleStatusItemPointerDown(e, t = 0) {
			this._stopEvent(e), this._clearStatusItemHoldTimer();
			let n = this._getStatusItemHoldAction(t);
			n && (this._statusItemHoldTimer = setTimeout(() => {
				this._statusItemLongPressTriggered = !0, this._handleAction(n, this._getStatusItemEntityId(t));
			}, this._LONG_PRESS_DELAY));
		}
		_handleStatusItemPointerUp(e) {
			this._stopEvent(e), this._clearStatusItemHoldTimer();
		}
		_handleStatusItemPointerCancel(e) {
			this._stopEvent(e), this._clearStatusItemHoldTimer();
		}
		_handleStatusItemContextMenu(e, t = 0) {
			this._stopEvent(e);
			let n = this._getStatusItemHoldAction(t);
			n && (this._clearStatusItemHoldTimer(), this._statusItemLongPressTriggered = !0, this._handleAction(n, this._getStatusItemEntityId(t)));
		}
		_navigate(e) {
			return Ke.call(this, e);
		}
		_handlePersonBadgeStop(e) {
			e.currentTarget?.dataEntity && e.stopPropagation();
		}
		_handlePersonBadgePointerUp(e) {
			let t = e.currentTarget?.dataEntity;
			t && (e.stopPropagation(), this._personBadgeActionFired = !0, this._openPersonBadgeMoreInfo(t));
		}
		_handlePersonBadgeClick(e) {
			let t = e.currentTarget?.dataEntity;
			if (t) {
				if (e.stopPropagation(), this._personBadgeActionFired) {
					this._personBadgeActionFired = !1;
					return;
				}
				this._openPersonBadgeMoreInfo(t);
			}
		}
		_openPersonBadgeMoreInfo(e) {
			this.dispatchEvent(new CustomEvent("hass-more-info", {
				detail: { entityId: e },
				bubbles: !0,
				composed: !0
			}));
		}
		_computeFullColor(e) {
			return $e.call(this, e);
		}
		_computeIconColor(e) {
			return et.call(this, e);
		}
		_computeCircleColor(e) {
			return tt.call(this, e);
		}
		_getMainStateObj() {
			let e = this._config.main_entity;
			return e && this.hass ? this.hass.states[e] : null;
		}
		formatState(e) {
			return mt(e);
		}
		_getEntityActiveState(e) {
			return ht(e);
		}
		_getBinarySensorIcon(e) {
			return yt(e);
		}
		_getDefaultDomainIcon(e, t = null) {
			return bt.call(this, e, t);
		}
		_isImageIcon(e) {
			return xt(e);
		}
		_resolveIconPath(e) {
			return St(e);
		}
		_getInlineSvg(e, t = !0) {
			return F.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e, t) {
			return wt(e, t);
		}
		_evaluateStateTemplate(e, t) {
			return Pt.call(this, e, t);
		}
		_getRelevantEntities() {
			return this._config?.mode === "icon_only" ? Du(this._config).map((e) => e.entity || e.main_entity) : [
				this._config?.main_entity,
				this._config?.tracker_entity,
				this._config?.eta_entity,
				this._config?.battery_entity_1,
				this._config?.battery_entity_2
			];
		}
		get _LONG_PRESS_DELAY() {
			return 500;
		}
		_handleMainIconPointerDown(e) {
			if (this._isDuplicateTouchEvent(e)) {
				this._stopEvent(e);
				return;
			}
			this._trackPointerEvent(e), this._stopEvent(e), e.currentTarget?.setPointerCapture?.(e.pointerId), this._mainIconPointerDown = !0, this._mainIconHoldFired = !1, this._mainIconSuppressUntil = 0, this._clearMainIconHoldTimer();
			let t = this._getMainEntityHoldAction();
			t && (this._mainIconHoldTimer = setTimeout(() => {
				this._mainIconHoldFired = !0, this._mainIconSuppressUntil = Date.now() + 1e3, this._handleAction(t, this._config.main_entity);
			}, this._LONG_PRESS_DELAY));
		}
		_handleMainIconPointerUp(e) {
			if (this._isDuplicateTouchEvent(e)) {
				this._stopEvent(e);
				return;
			}
			this._trackPointerEvent(e), this._stopEvent(e);
			let t = this._mainIconHoldFired;
			if (this._clearMainIconHoldTimer(), this._mainIconPointerDown = !1, t) {
				this._mainIconSuppressClick = !0, this._mainIconSuppressUntil = Date.now() + 1e3;
				return;
			}
			this._handleMainEntityTap(e), this._mainIconSuppressClick = !0;
		}
		_handleMainIconPointerCancel(e) {
			if (this._isDuplicateTouchEvent(e)) {
				this._stopEvent(e);
				return;
			}
			if (this._trackPointerEvent(e), this._stopEvent(e), !this._getMainEntityHoldAction()) {
				this._clearMainIconHoldTimer(), this._mainIconPointerDown = !1;
				return;
			}
		}
		_handleMainIconClick(e) {
			this._stopEvent(e), this._mainIconSuppressClick &&= !1;
		}
		_handleMainIconContextMenu(e) {
			this._stopEvent(e);
			let t = this._getMainEntityHoldAction();
			t && this._mainIconPointerDown && !this._mainIconHoldFired && (this._clearMainIconHoldTimer(), this._mainIconHoldFired = !0, this._mainIconSuppressClick = !0, this._mainIconSuppressUntil = Date.now() + 1e3, this._handleAction(t, this._config.main_entity));
		}
		_clearMainIconHoldTimer() {
			this._mainIconHoldTimer &&= (clearTimeout(this._mainIconHoldTimer), null);
		}
		_clearStatusItemHoldTimer() {
			this._statusItemHoldTimer &&= (clearTimeout(this._statusItemHoldTimer), null);
		}
		_getMainEntityHoldAction() {
			return t(this._config.main_entity_hold_action) ? this._config.main_entity_hold_action : null;
		}
		_getMainEntityTapAction() {
			let e = this._config.main_entity_tap_action;
			return e?.action === "none" ? null : e?.action ? e : this._isIconOnlyMode() || this._isPersonMode() ? null : { action: "more-info" };
		}
		_getCardTapAction() {
			let e = { action: this._isIconOnlyMode() || this._isPersonMode() ? "more-info" : "navigate" }, t = this._config.tap_action;
			return t?.action ? t : e;
		}
		_getStatusItemCardTapAction(e = 0) {
			let t = this._statusItems?.[e];
			return t?.tap_action?.action ? t.tap_action : this._config.main_entity_tap_action?.action ? this._config.main_entity_tap_action : this._config.tap_action?.action ? this._config.tap_action : { action: "more-info" };
		}
		_getStatusItemMainEntityTapAction(e = 0) {
			let t = this._statusItems?.[e];
			return t?.main_entity_tap_action?.action && t.main_entity_tap_action.action !== "none" ? t.main_entity_tap_action : this._config.main_entity_tap_action?.action && this._config.main_entity_tap_action.action !== "none" ? this._config.main_entity_tap_action : this._getStatusItemCardTapAction(e);
		}
		_getStatusItemHoldAction(e = 0) {
			let t = this._statusItems?.[e];
			return t?.main_entity_hold_action?.action ? t.main_entity_hold_action.action === "none" ? null : t.main_entity_hold_action : this._config.main_entity_hold_action?.action ? this._config.main_entity_hold_action.action === "none" ? null : this._config.main_entity_hold_action : null;
		}
		_isIconOnlyMode() {
			return this._config?.mode === "icon_only";
		}
		_isPersonMode() {
			return this._config?.mode === "person";
		}
		_getStatusItemEntityId(e = 0) {
			let t = this._statusItems?.[e];
			return t?.entityId || t?.entity || this._config.main_entity;
		}
		_getStatusColumnCount(e = this._statusItems?.length || 1) {
			return n(this._config, e);
		}
		_getStatusRowCount(e = this._statusItems?.length || 1) {
			return r(this._config, e);
		}
		_isStatusItemMainIconEvent(e) {
			return e.composedPath().some((e) => e?.classList && (e.classList.contains("status-circle") || e.classList.contains("main-icon") || e.classList.contains("main-image-icon")));
		}
		_trackPointerEvent(e) {
			e.type?.startsWith("pointer") && (this._lastMainIconPointerEventAt = Date.now());
		}
		_isDuplicateTouchEvent(e) {
			return !!(e.type?.startsWith("touch") && this._lastMainIconPointerEventAt && Date.now() - this._lastMainIconPointerEventAt < 750);
		}
		_shouldSuppressMainIconTap(e) {
			return !this._mainIconSuppressUntil || Date.now() > this._mainIconSuppressUntil ? !1 : !e || this._isMainIconEvent(e);
		}
		_stopEvent(e) {
			e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
		}
		render() {
			return Fu.call(this);
		}
		static styles = Hu;
	};
	function t(e) {
		return !!(e && e.action && e.action !== "none");
	}
	function n(e = {}, t = 1) {
		if (!e.wrap) return Math.max(1, t);
		let n = Number(e.items_per_row);
		return Math.max(1, Math.min(t, (Number.isFinite(n) ? Math.floor(n) : 3) || 1));
	}
	function r(e = {}, t = 1) {
		let r = n(e, t);
		return Math.max(1, Math.ceil(t / r));
	}
	customElements.define("orbit-status-card", e), window.customCards = window.customCards || [], window.customCards.push({
		type: "orbit-status-card",
		name: "Orbit Status Card",
		description: "Responsive status card",
		preview: !0,
		version: Z.status,
		getEntitySuggestion: a
	}), console.info(`%c Orbit Status Card %c v${Z.status} `, "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;", "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;");
	var i = new Set([
		"automation",
		"button",
		"input_button",
		"scene",
		"script"
	]);
	function a(e, t) {
		let n = Bt(t);
		if (n === "person") return { config: {
			type: "custom:orbit-status-card",
			mode: "person",
			main_entity: t
		} };
		if (i.has(n)) return null;
		let r = {
			label: z(e, "Standard"),
			config: {
				type: "custom:orbit-status-card",
				mode: "standard",
				main_entity: t
			}
		};
		return Ht(e, t) ? [r, {
			label: z(e, "Icon Only"),
			config: {
				type: "custom:orbit-status-card",
				mode: "icon_only",
				main_entity: t
			}
		}] : { config: r.config };
	}
}));
//#endregion
//#region src/cards/action/helpers/lifecycle.js
function $u(e) {
	!e.has("_config") && !e.has("hass") || (this._actions = ed(this._config).map((e) => td.call(this, e)));
}
function ed(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.main_entity,
		accent_color: e.accent_color,
		main_entity_icon: e.main_entity_icon,
		main_entity_icon_svg_color_override: e.main_entity_icon_svg_color_override,
		tap_action: e.tap_action,
		hold_action: e.hold_action
	}];
}
function td(e) {
	let t = e.entity || e.main_entity, n = t && this.hass ? this.hass.states[t] : null, r = e.accent_color || this._config.accent_color || "theme", i = nd(n), a = this._computeCircleColor(r), o = i ? this._computeFullColor(r) : this._computeIconColor(r), s = e.main_entity_icon ? "main_entity_icon" : e.icon ? "icon" : "", c = e.main_entity_icon || e.icon || n?.attributes?.icon || (n ? this._getDefaultDomainIcon(n.entity_id.split(".")[0], n) : "mdi:play-circle");
	return {
		...e,
		entityId: t,
		icon: c,
		iconColor: o,
		cardBackground: a,
		isRunning: i,
		svgForceColor: s ? this._getSvgColorOverride(e, s) : !0
	};
}
function nd(e) {
	if (!e) return !1;
	let t = e.entity_id?.split(".")[0], n = Number(e.attributes?.current);
	return Number.isFinite(n) && n > 0 ? !0 : t === "script" && e.state === "on";
}
var rd = e((() => {}));
//#endregion
//#region src/cards/action/renders/action-card.js
function id() {
	let e = this._actions || [], t = Math.max(e.length, 1), n = this._getActionColumnCount(t), r = this._getActionRowCount(t);
	return w`
    <ha-card
      class="${t > 1 ? "grouped" : ""} ${t > 1 && this._config?.separate_cards ? "separate-cards" : ""}"
      tabindex="0"
      style="
        --action-count:${t};
        --action-columns:${n};
        --action-rows:${r};
      "
    >
      <div class="container action-container">
        ${e.map((e, t) => ad.call(this, e, t))}
      </div>
    </ha-card>
  `;
}
function ad(e, t) {
	let n = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", r = n ? this._getInlineSvg(n, e.svgForceColor) : "";
	return w`
    <div
      class="action-button ${e.isRunning ? "running" : ""}"
      role="button"
      tabindex="0"
      style="
        --action-card-background:${e.cardBackground};
        --action-icon-color:${e.iconColor};
      "
      @click=${(e) => this._handleTap(e, t)}
      @pointerdown=${(e) => this._handlePointerDown(e, t)}
      @pointerup=${this._handlePointerUp}
      @pointerleave=${this._handlePointerCancel}
      @pointercancel=${this._handlePointerCancel}
      @contextmenu=${(e) => this._handleContextMenu(e, t)}
    >
      <div class="circle action-circle">
        ${this._isImageIcon(e.icon) ? w`
              <div class="main-image-icon">
                ${r ? V(r) : w`<img src=${n} alt="" />`}
              </div>
            ` : w`
              <ha-icon
                class="main-icon"
                .icon=${e.icon}
              ></ha-icon>
            `}
      </div>
    </div>
  `;
}
var od = e((() => {
	j(), H();
})), sd, cd = e((() => {
	j(), Ds(), ks(), sd = [
		Es,
		Os,
		c`
    ha-card {
      aspect-ratio: 0.94 / 1;
      border-radius: 15px;
    }

    ha-card.grouped {
      aspect-ratio: auto;
      container-type: inline-size;
    }

    ha-card.grouped.separate-cards {
      background: transparent;
      box-shadow: none;
    }

    .action-container {
      display: grid;
      grid-template-columns: repeat(var(--action-columns, var(--action-count, 1)), minmax(0, 1fr));
      grid-auto-rows: minmax(0, 1fr);
      align-items: center;
      gap: clamp(4px, 2cqw, 10px);
      padding: 0;
      box-sizing: border-box;
    }

    ha-card.grouped.separate-cards .action-container {
      gap: clamp(5px, 1.4cqw, 8px);
      padding: 0 2px 4px;
    }

    ha-card.grouped .action-container {
      align-content: start;
      grid-auto-rows: auto;
      height: auto;
    }

    .action-button {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 15px;
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    ha-card.grouped .action-button {
      aspect-ratio: 0.94 / 1;
      height: auto;
    }

    ha-card.grouped.separate-cards .action-button {
      box-shadow: var(--ha-card-box-shadow, 0 1px 3px 0 rgba(0, 0, 0, 0.14));
    }

    .action-circle {
      width: min(84%, 84cqh);
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      background: var(--action-card-background, rgba(var(--color-theme),0.05));
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      pointer-events: none;
    }

    .action-button.running .action-circle {
      background: color-mix(
        in srgb,
        var(--action-card-background, rgba(var(--color-theme),0.05)) 70%,
        var(--action-icon-color, currentColor)
      );
    }

    .action-circle .main-icon,
    .action-circle .main-image-icon {
      color: var(--action-icon-color);
    }

    .action-circle .main-icon {
      --mdc-icon-size: 58%;
    }

    .action-circle .main-image-icon {
      width: 58%;
      height: 58%;
    }
  `
	];
}));
//#endregion
//#region src/editors/action/sections/action.js
function ld() {
	let e = this._getActionItems(), t = Math.min(this._selectedActionIndex || 0, e.length - 1), n = e[t] || {}, r = this._actionEntityDomainFilter || "all", i = ud(r), a = Math.max(1, Number(this._config?.actions_per_row) || 3), o = !!this._config?.wrap && e.length > a, s = !o && e.length > 6 || o && a > 6;
	return w`
    <div class="section">
      <div class="action-group-options">
        <label class="action-wrap-toggle">
          <span>${this._t("Wrap")}</span>
          <ha-switch
            .checked=${!!this._config?.wrap}
            @change=${(e) => this._updateConfig({
		wrap: e.target.checked,
		actions_per_row: e.target.checked ? this._config?.actions_per_row || 3 : this._config?.actions_per_row
	})}
          ></ha-switch>
        </label>

        ${e.length > 1 ? w`
              <label class="action-wrap-toggle">
                <span>${this._t("Separate Cards")}</span>
                <ha-switch
                  .checked=${!!this._config?.separate_cards}
                  @change=${(e) => this._updateConfig({ separate_cards: e.target.checked })}
                ></ha-switch>
              </label>
            ` : ""}

      ${this._config?.wrap ? w`
            <label class="action-per-row-field">
              <span>${this._t("Actions Per Row")}</span>

              <input
                type="number"
                min="1"
                step="1"
                .value=${String(this._config?.actions_per_row || 3)}
                @input=${(e) => this._updateConfig({ actions_per_row: Math.max(1, Number(e.target.value) || 1) })}
              />
            </label>
          ` : ""}
      </div>

      <div
        class="action-tabs ${o ? "wrapped" : ""} ${s ? "scroll-hint" : ""} ${e.length > 1 ? "has-tools" : ""}"
        style=${o ? `--action-tabs-per-row: ${a};` : ""}
      >
        <div class="action-tab-items">
          ${e.map((e, n) => w`
            <button
              type="button"
              class="action-tab ${n === t ? "active" : ""}"
              @click=${() => this._selectActionItem(n)}
            >
              ${n + 1}
            </button>
          `)}
        </div>

        ${s ? w`
              <div class="action-tabs-scroll-indicator" aria-hidden="true">
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </div>
            ` : ""}

        <div class="action-editor-tools">
          <button
            type="button"
            class="action-tab-add"
            title=${this._t("Add")}
            @click=${() => this._addActionItem()}
          >
            +
          </button>

          ${e.length > 1 ? w`
                <button
                  type="button"
                  class="action-tool-button action-tool-remove"
                  title=${this._t("Remove")}
                  @click=${() => this._removeActionItem(t)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move left")}
                  ?disabled=${t === 0}
                  @click=${() => this._moveActionItem(t, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move right")}
                  ?disabled=${t === e.length - 1}
                  @click=${() => this._moveActionItem(t, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>
              ` : ""}
        </div>
      </div>

      <div class="field">
        <label>${this._t("Main Entity")}</label>

        <div class="action-domain-filters">
          ${dd.map((e) => w`
            <button
              type="button"
              class=${e.value === r ? "active" : ""}
              @click=${() => {
		this._actionEntityDomainFilter = e.value;
	}}
            >
              ${this._t(e.label)}
            </button>
          `)}
        </div>

        <div class="entity-row">
          <ha-selector
            class="entity-picker"
            .hass=${this.hass}
            .selector=${{ entity: { domain: i } }}
            .value=${n.entity || ""}
            @value-changed=${(e) => this._updateActionItem(t, { entity: e.detail.value || "" })}
          ></ha-selector>

          ${n.entity ? w`
                <button
                  type="button"
                  class="clear-button"
                  @click=${() => this._updateActionItem(t, { entity: "" })}
                >
                  ✕
                </button>
              ` : ""}
        </div>
      </div>

      ${this._renderColorControl("Accent Color", `action-${t}-accent_color`, n.accent_color || "", (e) => this._updateActionItem(t, { accent_color: e }))}

      ${this._renderActionItemIconInput("Main Entity Icon", "main_entity_icon", t)}

      ${n.entity ? w`
            ${this._renderActionItemActionSelector("Tap Action", "tap_action", t, Wt(n.entity, "toggle"))}
            ${this._renderActionItemActionSelector("Hold Action", "hold_action", t, "more-info")}
          ` : ""}
    </div>
  `;
}
function ud(e) {
	return (dd.find((t) => t.value === e) || dd[0]).domains;
}
var dd, fd = e((() => {
	j(), qt(), dd = [
		{
			label: "All",
			value: "all",
			domains: [
				"scene",
				"script",
				"automation",
				"button",
				"input_button"
			]
		},
		{
			label: "Scenes",
			value: "scene",
			domains: ["scene"]
		},
		{
			label: "Scripts",
			value: "script",
			domains: ["script"]
		},
		{
			label: "Automations",
			value: "automation",
			domains: ["automation"]
		},
		{
			label: "Buttons",
			value: "button",
			domains: [
				"button",
				"input_button",
				"input_boolean"
			]
		}
	];
})), pd = /* @__PURE__ */ t((() => {
	j(), Al(), fd(), du(), pu(), R(), B(), Q();
	var e = class extends A {
		static svgCache = L;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_selectedActionIndex: { state: !0 },
			_actionEntityDomainFilter: { state: !0 },
			_colorPickerKey: { state: !0 },
			_colorPickerTab: { state: !0 },
			_iconPickerKey: { state: !0 },
			_iconPickerTab: { state: !0 },
			_iconFileSearch: { state: !0 },
			_iconFilePickerOpen: { state: !0 },
			_orbitIconFiles: { state: !0 },
			_orbitIconFilesLoading: { state: !0 },
			_localIconFiles: { state: !0 },
			_localIconFilesLoading: { state: !0 }
		};
		constructor() {
			super(), this._config = this._config || {}, this._selectedActionIndex = 0, this._actionEntityDomainFilter = "all", this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._iconFileSearch = "", this._iconFilePickerOpen = !1, this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1;
		}
		connectedCallback() {
			super.connectedCallback(), vl(this);
		}
		disconnectedCallback() {
			yl(this), super.disconnectedCallback();
		}
		setConfig(e) {
			this._config = e || {}, this._selectedActionIndex = Math.min(this._selectedActionIndex || 0, this._getActionItems(e).length - 1);
		}
		_t(e, t) {
			return z(this.hass, e, t);
		}
		_updateConfig(e) {
			this._config = o(kc(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: this._config },
				bubbles: !0,
				composed: !0
			}));
		}
		_handleConfigUpdate(e, t) {
			this._updateConfig({ [e]: t });
		}
		_getActionItems(e = this._config) {
			return Array.isArray(e?.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
				entity: e?.main_entity || "",
				accent_color: e?.accent_color || "",
				main_entity_icon: e?.main_entity_icon || "",
				tap_action: e?.tap_action,
				hold_action: e?.hold_action
			}];
		}
		_selectActionItem(e) {
			this._selectedActionIndex = e;
		}
		_addActionItem() {
			let e = this._getActionItems();
			this._selectedActionIndex = e.length, this._updateConfig(K(r, { entities: [...e, { entity: "" }] }));
		}
		_removeActionItem(e) {
			let t = this._getActionItems();
			if (t.length <= 1) {
				this._updateConfig(q("main_entity", n));
				return;
			}
			let r = t.filter((t, n) => n !== e);
			this._selectedActionIndex = Math.max(0, Math.min(e, r.length - 1)), this._updateConfig({ entities: r });
		}
		_moveActionItem(e, t) {
			let n = this._getActionItems(), i = e + t;
			if (i < 0 || i >= n.length) return;
			let a = [...n], [o] = a.splice(e, 1);
			a.splice(i, 0, o), this._selectedActionIndex = i, this._updateConfig(K(r, { entities: a }));
		}
		_updateActionItem(e, i) {
			let a = this._getActionItems(), o = {
				...a[e] || {},
				...i
			};
			if (i.entity === "" && t(o), Array.isArray(this._config?.entities)) {
				let t = [...a];
				t[e] = o;
				let n = { entities: t };
				t.length > 1 && Object.assign(n, K(r)), this._updateConfig(n);
				return;
			}
			if (i.entity === "") {
				this._updateConfig(q("main_entity", n));
				return;
			}
			this._updateConfig({
				main_entity: o.entity || "",
				accent_color: o.accent_color || "",
				main_entity_icon: o.main_entity_icon || "",
				tap_action: o.tap_action,
				hold_action: o.hold_action
			});
		}
		_getColorStyle(e) {
			return xl(e);
		}
		_getColorPickerValue(e) {
			return Sl(e);
		}
		_renderActionSelector(e, t, n) {
			return $c.call(this, e, t, n);
		}
		_renderActionItemActionSelector(e, t, n, r) {
			let i = this._getActionItems()[n] || {}, a = {
				hass: this.hass,
				_config: i,
				_t: (e, t) => this._t(e, t),
				requestUpdate: () => this.requestUpdate(),
				_updateConfig: (e) => this._updateActionItem(n, e)
			};
			return $c.call(a, e, t, r);
		}
		_renderColor(e, t) {
			return Fc.call(this, e, t);
		}
		_renderColorControl(e, t, n, r) {
			return Ic.call(this, e, t, n, r);
		}
		_renderEntity(e, t) {
			return dl.call(this, e, t);
		}
		_renderIconInput(e, t, n = "mdi:palette or icon.svg") {
			return $s.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return ec.call(this, e);
		}
		_renderActionItemIconInput(e, t, n, r = "mdi:palette or icon.svg") {
			let i = this._getActionItems()[n] || {}, a = {
				hass: this.hass,
				_config: i,
				_iconPickerPrefix: `action-${n}-icon`,
				_t: (e, t) => this._t(e, t),
				_isImageIcon: (e) => this._isImageIcon(e),
				_resolveIconPath: (e) => this._resolveIconPath(e),
				_getInlineSvg: (e) => this._getInlineSvg(e),
				_loadLocalIconFiles: (e) => this._loadLocalIconFiles(e),
				requestUpdate: () => this.requestUpdate(),
				renderRoot: this.renderRoot,
				_handleConfigUpdate: (e, t) => this._updateActionItem(n, { [e]: t })
			};
			return Object.defineProperties(a, {
				_iconPickerKey: {
					get: () => this._iconPickerKey,
					set: (e) => {
						this._iconPickerKey = e;
					}
				},
				_iconPickerTab: {
					get: () => this._iconPickerTab,
					set: (e) => {
						this._iconPickerTab = e;
					}
				},
				_localIconFiles: {
					get: () => this._localIconFiles,
					set: (e) => {
						this._localIconFiles = e;
					}
				},
				_orbitIconFiles: {
					get: () => this._orbitIconFiles,
					set: (e) => {
						this._orbitIconFiles = e;
					}
				},
				_localIconFilesLoading: {
					get: () => this._localIconFilesLoading,
					set: (e) => {
						this._localIconFilesLoading = e;
					}
				},
				_orbitIconFilesLoading: {
					get: () => this._orbitIconFilesLoading,
					set: (e) => {
						this._orbitIconFilesLoading = e;
					}
				}
			}), $s.call(a, e, t, r);
		}
		_isImageIcon(e) {
			return Xs(e);
		}
		_resolveIconPath(e) {
			return Zs(e);
		}
		_getInlineSvg(e) {
			return F.call(this, e, { forceColor: !0 });
		}
		_renderActionSection() {
			return ld.call(this);
		}
		render() {
			return w`
      <div class="wrapper">
        ${this._renderActionSection()}
        <div class="editor-version">
          ${this._t("Orbit Action Card v{version}", { version: Z.action })}
        </div>
      </div>
    `;
		}
		static styles = [uu, fu];
	};
	customElements.define("orbit-action-card-editor", e);
	function t(e) {
		Object.assign(e, K(n));
	}
	var n = [
		"accent_color",
		"main_entity_icon",
		"tap_action",
		"hold_action"
	], r = ["main_entity", ...n], i = [
		"entity",
		"accent_color",
		"main_entity_icon",
		"main_entity_icon_svg_color_override",
		"tap_action",
		"hold_action"
	], a = [
		"type",
		"main_entity",
		"accent_color",
		"main_entity_icon",
		"main_entity_icon_svg_color_override",
		"tap_action",
		"hold_action",
		"wrap",
		"actions_per_row",
		"separate_cards",
		"entities",
		"grid_options",
		"view_layout"
	];
	function o(e) {
		let t = {}, n = /* @__PURE__ */ new Set();
		return a.forEach((r) => {
			Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "entities" && Array.isArray(e[r]) ? e[r].map(s) : e[r], n.add(r));
		}), Object.keys(e).forEach((r) => {
			n.has(r) || (t[r] = e[r]);
		}), t;
	}
	function s(e) {
		return !e || typeof e != "object" || Array.isArray(e) ? e : c(e, i);
	}
	function c(e, t) {
		let n = {}, r = /* @__PURE__ */ new Set();
		return t.forEach((t) => {
			Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t], r.add(t));
		}), Object.keys(e).forEach((t) => {
			r.has(t) || (n[t] = e[t]);
		}), n;
	}
})), md = /* @__PURE__ */ t((() => {
	j(), Qe(), qt(), P(), kt(), zt(), Ut(), R(), rd(), od(), cd(), pd(), Q();
	var e = class extends A {
		static svgCache = L;
		static get properties() {
			return {
				hass: {},
				_config: { type: Object },
				_icon: { type: String },
				_iconColor: { type: String },
				_cardBackground: { type: String },
				_isRunning: { type: Boolean },
				_actions: { type: Array }
			};
		}
		static getConfigElement() {
			return document.createElement("orbit-action-card-editor");
		}
		static getStubConfig() {
			return {
				type: "custom:orbit-action-card",
				main_entity: "",
				accent_color: "theme"
			};
		}
		getLayoutOptions() {
			let e = ed(this._config).length, n = t(this._config, e);
			return {
				grid_columns: Math.max(1, n * 1),
				grid_min_columns: .5,
				grid_rows: "auto"
			};
		}
		setConfig(e) {
			this._config = e;
			let t = e.accent_color || "theme";
			this._iconColor = this._computeIconColor(t), this._cardBackground = this._computeCircleColor(t), this._isRunning = !1, this._actions = [];
		}
		willUpdate(e) {
			return $u.call(this, e);
		}
		shouldUpdate(e) {
			return It.call(this, e, ed(this._config).map((e) => e.entity || e.main_entity), { hasTemplates: Lt(this._config) });
		}
		_handleTap(e, t = 0) {
			if (this._longPressTriggered) {
				this._longPressTriggered = !1, this._stopEvent(e);
				return;
			}
			this._stopEvent(e), this._handleAction(this._getTapAction(t), this._getActionEntityId(t));
		}
		_handlePointerDown(e, t = 0) {
			this._stopEvent(e), this._clearHoldTimer(), this._holdTimer = setTimeout(() => {
				this._longPressTriggered = !0, this._handleAction(this._getHoldAction(t), this._getActionEntityId(t));
			}, 500);
		}
		_handlePointerUp(e) {
			this._stopEvent(e), this._clearHoldTimer();
		}
		_handlePointerCancel(e) {
			this._stopEvent(e), this._clearHoldTimer();
		}
		_handleContextMenu(e, t = 0) {
			this._stopEvent(e), this._clearHoldTimer(), this._longPressTriggered = !0, this._handleAction(this._getHoldAction(t), this._getActionEntityId(t));
		}
		_getTapAction(e = 0) {
			let t = this._actions?.[e];
			return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : Wt(this._getActionEntityId(e), "toggle");
		}
		_getHoldAction(e = 0) {
			let t = this._actions?.[e];
			return t?.hold_action?.action ? t.hold_action : this._config.hold_action?.action ? this._config.hold_action : { action: "more-info" };
		}
		_getActionEntityId(e = 0) {
			let t = this._actions?.[e];
			return t?.entityId || t?.entity || this._config.main_entity;
		}
		_getActionColumnCount(e = this._actions?.length || 1) {
			return t(this._config, e);
		}
		_getActionRowCount(e = this._actions?.length || 1) {
			let t = this._getActionColumnCount(e);
			return Math.max(1, Math.ceil(e / t));
		}
		_handleAction(e, t = null) {
			return We.call(this, e, t);
		}
		_computeFullColor(e) {
			return $e.call(this, e);
		}
		_computeIconColor(e) {
			return et.call(this, e);
		}
		_computeCircleColor(e) {
			return tt.call(this, e);
		}
		_getDefaultDomainIcon(e, t = null) {
			return bt.call(this, e, t);
		}
		_isImageIcon(e) {
			return xt(e);
		}
		_resolveIconPath(e) {
			return St(e);
		}
		_getInlineSvg(e, t = !0) {
			return F.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e, t) {
			return wt(e, t);
		}
		_clearHoldTimer() {
			this._holdTimer &&= (clearTimeout(this._holdTimer), null);
		}
		_stopEvent(e) {
			e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
		}
		render() {
			return id.call(this);
		}
		static styles = sd;
	};
	function t(e = {}, t = 1) {
		if (!e.wrap) return Math.max(1, t);
		let n = Number(e.actions_per_row);
		return Math.max(1, Math.min(t, (Number.isFinite(n) ? Math.floor(n) : 3) || 1));
	}
	customElements.define("orbit-action-card", e), window.customCards = window.customCards || [], window.customCards.push({
		type: "orbit-action-card",
		name: "Orbit Action Card",
		description: "Compact scene, script, and automation launcher",
		preview: !0,
		version: Z.action,
		getEntitySuggestion: r
	}), console.info(`%c Orbit Action Card %c v${Z.action} `, "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;", "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;");
	var n = new Set([
		"automation",
		"button",
		"input_button",
		"scene",
		"script"
	]);
	function r(e, t) {
		return n.has(Bt(t)) ? { config: {
			type: "custom:orbit-action-card",
			main_entity: t
		} } : null;
	}
})), hd = /* @__PURE__ */ t((() => {
	hu(), Qu(), md();
}));
//#endregion
export default hd();
