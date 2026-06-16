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
	if (t === E) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = S(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = v(e, i._$AS(e, t.values), i, r)), t;
}
var de, fe, pe, me, he, y, ge, _e, b, x, S, ve, ye, be, C, xe, Se, w, Ce, we, Te, Ee, T, E, D, De, O, Oe, ke, Ae, k, A, je, Me, Ne, Pe, Fe, Ie, Le, j = e((() => {
	de = globalThis, fe = (e) => e, pe = de.trustedTypes, me = pe ? pe.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, he = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, ge = "?" + y, _e = `<${ge}>`, b = document, x = () => b.createComment(""), S = (e) => e === null || typeof e != "object" && typeof e != "function", ve = Array.isArray, ye = (e) => ve(e) || typeof e?.[Symbol.iterator] == "function", be = "[ 	\n\f\r]", C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xe = /-->/g, Se = />/g, w = RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), Ce = /'/g, we = /"/g, Te = /^(?:script|style|textarea|title)$/i, Ee = (e) => (t, ...n) => ({
		_$litType$: e,
		strings: t,
		values: n
	}), T = Ee(1), Ee(2), Ee(3), E = Symbol.for("lit-noChange"), D = Symbol.for("lit-nothing"), De = /* @__PURE__ */ new WeakMap(), O = b.createTreeWalker(b, 129), Oe = (e, t) => {
		let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = C;
		for (let t = 0; t < n; t++) {
			let n = e[t], s, c, l = -1, u = 0;
			for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === C ? c[1] === "!--" ? o = xe : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = w) : (Te.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = w) : o = Se : o === w ? c[0] === ">" ? (o = i ?? C, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? w : c[3] === "\"" ? we : Ce) : o === we || o === Ce ? o = w : o === xe || o === Se ? o = C : (o = w, i = void 0);
			let d = o === w && e[t + 1].startsWith("/>") ? " " : "";
			a += o === C ? n + _e : l >= 0 ? (r.push(s), n.slice(0, l) + he + n.slice(l) + y + d) : n + y + (l === -2 ? t : d);
		}
		return [ue(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
	}, ke = class e {
		constructor({ strings: t, _$litType$: n }, r) {
			let i;
			this.parts = [];
			let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Oe(t, n);
			if (this.el = e.createElement(l, r), O.currentNode = this.el.content, n === 2 || n === 3) {
				let e = this.el.content.firstChild;
				e.replaceWith(...e.childNodes);
			}
			for (; (i = O.nextNode()) !== null && c.length < s;) {
				if (i.nodeType === 1) {
					if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(he)) {
						let t = u[o++], n = i.getAttribute(e).split(y), r = /([.?@])?(.*)/.exec(t);
						c.push({
							type: 1,
							index: a,
							name: r[2],
							strings: n,
							ctor: r[1] === "." ? je : r[1] === "?" ? Me : r[1] === "@" ? Ne : A
						}), i.removeAttribute(e);
					} else e.startsWith(y) && (c.push({
						type: 6,
						index: a
					}), i.removeAttribute(e));
					if (Te.test(i.tagName)) {
						let e = i.textContent.split(y), t = e.length - 1;
						if (t > 0) {
							i.textContent = pe ? pe.emptyScript : "";
							for (let n = 0; n < t; n++) i.append(e[n], x()), O.nextNode(), c.push({
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
	}, Ae = class {
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
			O.currentNode = r;
			let i = O.nextNode(), a = 0, o = 0, s = n[0];
			for (; s !== void 0;) {
				if (a === s.index) {
					let t;
					s.type === 2 ? t = new k(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Pe(i, this, e)), this._$AV.push(t), s = n[++o];
				}
				a !== s?.index && (i = O.nextNode(), a++);
			}
			return O.currentNode = b, r;
		}
		p(e) {
			let t = 0;
			for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
		}
	}, k = class e {
		get _$AU() {
			return this._$AM?._$AU ?? this._$Cv;
		}
		constructor(e, t, n, r) {
			this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
			e = v(this, e, t), S(e) ? e === D || e == null || e === "" ? (this._$AH !== D && this._$AR(), this._$AH = D) : e !== this._$AH && e !== E && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ye(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
		}
		O(e) {
			return this._$AA.parentNode.insertBefore(e, this._$AB);
		}
		T(e) {
			this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
		}
		_(e) {
			this._$AH !== D && S(this._$AH) ? this._$AA.nextSibling.data = e : this.T(b.createTextNode(e)), this._$AH = e;
		}
		$(e) {
			let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ke.createElement(ue(n.h, n.h[0]), this.options)), n);
			if (this._$AH?._$AD === r) this._$AH.p(t);
			else {
				let e = new Ae(r, this), n = e.u(this.options);
				e.p(t), this.T(n), this._$AH = e;
			}
		}
		_$AC(e) {
			let t = De.get(e.strings);
			return t === void 0 && De.set(e.strings, t = new ke(e)), t;
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
	}, A = class {
		get tagName() {
			return this.element.tagName;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		constructor(e, t, n, r, i) {
			this.type = 1, this._$AH = D, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = D;
		}
		_$AI(e, t = this, n, r) {
			let i = this.strings, a = !1;
			if (i === void 0) e = v(this, e, t, 0), a = !S(e) || e !== this._$AH && e !== E, a && (this._$AH = e);
			else {
				let r = e, o, s;
				for (e = i[0], o = 0; o < i.length - 1; o++) s = v(this, r[n + o], t, o), s === E && (s = this._$AH[o]), a ||= !S(s) || s !== this._$AH[o], s === D ? e = D : e !== D && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
			}
			a && !r && this.j(e);
		}
		j(e) {
			e === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
		}
	}, je = class extends A {
		constructor() {
			super(...arguments), this.type = 3;
		}
		j(e) {
			this.element[this.name] = e === D ? void 0 : e;
		}
	}, Me = class extends A {
		constructor() {
			super(...arguments), this.type = 4;
		}
		j(e) {
			this.element.toggleAttribute(this.name, !!e && e !== D);
		}
	}, Ne = class extends A {
		constructor(e, t, n, r, i) {
			super(e, t, n, r, i), this.type = 5;
		}
		_$AI(e, t = this) {
			if ((e = v(this, e, t, 0) ?? D) === E) return;
			let n = this._$AH, r = e === D && n !== D || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== D && (n === D || r);
			r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
		}
		handleEvent(e) {
			typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
		}
	}, Pe = class {
		constructor(e, t, n) {
			this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		_$AI(e) {
			v(this, e);
		}
	}, Fe = {
		M: he,
		P: y,
		A: ge,
		C: 1,
		L: Oe,
		R: Ae,
		D: ye,
		V: v,
		I: k,
		H: A,
		N: Me,
		U: Ne,
		B: je,
		F: Pe
	}, Ie = de.litHtmlPolyfillSupport, Ie?.(ke, k), (de.litHtmlVersions ??= []).push("3.3.3"), Le = (e, t, n) => {
		let r = n?.renderBefore ?? t, i = r._$litPart$;
		if (i === void 0) {
			let e = n?.renderBefore ?? null;
			r._$litPart$ = i = new k(t.insertBefore(x(), e), e, void 0, n ?? {});
		}
		return i._$AI(e), i;
	};
})), Re, M, ze, Be = e((() => {
	le(), le(), j(), j(), Re = globalThis, M = class extends _ {
		constructor() {
			super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
		}
		createRenderRoot() {
			let e = super.createRenderRoot();
			return this.renderOptions.renderBefore ??= e.firstChild, e;
		}
		update(e) {
			let t = this.render();
			this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Le(t, this.renderRoot, this.renderOptions);
		}
		connectedCallback() {
			super.connectedCallback(), this._$Do?.setConnected(!0);
		}
		disconnectedCallback() {
			super.disconnectedCallback(), this._$Do?.setConnected(!1);
		}
		render() {
			return E;
		}
	}, M._$litElement$ = !0, M.finalized = !0, Re.litElementHydrateSupport?.({ LitElement: M }), ze = Re.litElementPolyfillSupport, ze?.({ LitElement: M }), (Re.litElementVersions ??= []).push("4.2.2");
})), Ve = e((() => {})), N = e((() => {
	le(), j(), Be(), Ve();
}));
//#endregion
//#region src/common/helpers/actions.js
function He(e, t = null) {
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
		case "call-service": {
			let [t, n] = (e.service || "").split(".");
			if (!t || !n) return;
			this.hass.callService(t, n, e.service_data || {});
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
			let r = Ue(e, t, n);
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
function Ue(e, t, n) {
	let { action: r, popup_title: i, popup_content: a, popup_options: o, title: s, content: c, ...l } = e;
	return {
		...l,
		...o || {},
		title: t,
		content: n
	};
}
function We(e) {
	e && (history.pushState(null, "", e), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } })));
}
function Ge(e, t, n = null) {
	t.stopPropagation(), this._handleAction(n || { action: "toggle" }, e);
}
function Ke(e) {
	e.stopPropagation();
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction;
	this._handleAction(n, t);
}
function qe(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction;
	this._handleAction(n, t);
}
function Je(e) {
	if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return;
	e.stopPropagation();
	let t = this._config.navigate || { navigation_path: "/lovelace/home" };
	this._navigate(t.navigation_path);
}
function Ye(e) {
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
var Xe = e((() => {}));
//#endregion
//#region src/common/helpers/colors.js
function Ze(e) {
	if (!e) return "rgb(var(--color-theme))";
	let t = e.toString().trim();
	return F(t) ? t : tt(t);
}
function Qe(e) {
	if (!e) return "rgba(var(--color-theme), 0.4)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.4)" : F(t) ? `color-mix(in srgb, transparent, ${t} 70%)` : P(t, 70);
}
function $e(e) {
	if (!e) return "rgba(var(--color-theme), 0.2)";
	let t = e.toString().trim();
	return F(t) ? `color-mix(in srgb, transparent, ${t} 20%)` : t === "theme" ? "rgba(var(--color-theme), 0.05)" : P(t, 20);
}
function et(e) {
	if (!e) return "rgba(var(--color-theme), 0.25)";
	let t = e.toString().trim();
	return F(t) ? `color-mix(in srgb, ${t} 25%, transparent)` : P(t, 25);
}
function tt(e) {
	let t = nt(e);
	return t ? t.startsWith("color-") ? `rgb(var(--${t}))` : `var(--${t}, rgb(var(--color-${t}, var(--color-theme))))` : "rgb(var(--color-theme))";
}
function P(e, t) {
	return `color-mix(in srgb, transparent, ${tt(e)} ${t}%)`;
}
function F(e) {
	let t = e.toString().trim();
	return t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("#");
}
function nt(e) {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
}
var rt = e((() => {}));
//#endregion
//#region src/common/helpers/card-name.js
function it(e, t, n = "Card") {
	if (e.name) return e.name;
	if (e.card_name) return e.card_name;
	if (e.room_name) return e.room_name;
	if (e.status_name) return e.status_name;
	let r = e.area;
	return r && t?.areas?.[r] && t.areas[r].name || n;
}
var at = e((() => {}));
//#endregion
//#region src/common/helpers/entities.js
function ot(e) {
	let t = e.attributes.unit_of_measurement || "", n = e.state;
	return t ? `${n}${t}` : n === "on" || n === "off" ? n.toUpperCase() : n;
}
function st(e) {
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
var ct = e((() => {}));
//#endregion
//#region src/common/helpers/icons.js
function lt(e, t) {
	let n = this._config.accent_color || "theme";
	return t ? n === "light" ? this._getEntityColor(e) || this._computeFullColor("theme") : this._computeFullColor(n) : this._computeIconColor(n);
}
function ut(e) {
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
function dt(e) {
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
function ft(e, t = null) {
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
function pt(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".webp") || t.endsWith(".gif");
}
function mt(e) {
	return e ? e.startsWith("orbit:") ? ht(e.slice(6)) : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function ht(e) {
	let t = import.meta.url.split("?")[0];
	return `${t.slice(0, t.lastIndexOf("/") + 1)}icons/${e}`;
}
function I(e, t = {}) {
	if (!e) return "";
	let n = t.forceColor !== !1, r = `${e}::${n ? "forced" : "auto"}`, i = this.constructor.svgCache, a = i[r];
	return typeof a == "string" && a !== "loading" ? a : a === "loading" ? (vt(r, this), "") : (i[r] = "loading", vt(r, this), bt(e).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.text();
	}).then((e) => {
		e = _t(e, n), i[r] = e, yt(r);
	}).catch((t) => {
		console.error("SVG load failed:", e, t), delete i[r], yt(r);
	}), "");
}
function gt(e, t) {
	return !e || !t ? !0 : e[`${t}_svg_color_override`] !== !1;
}
function _t(e, t) {
	let n = e.replace(/width="[^"]*"/gi, "width=\"100%\"").replace(/height="[^"]*"/gi, "height=\"100%\"");
	return t ? n.replace(/fill="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "fill=\"currentColor\"").replace(/stroke="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "stroke=\"currentColor\"").replace(/fill:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "fill:currentColor").replace(/stroke:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "stroke:currentColor") : n;
}
function vt(e, t) {
	t && (L[e] = L[e] || /* @__PURE__ */ new Set(), L[e].add(t));
}
function yt(e) {
	let t = L[e];
	t && (delete L[e], requestAnimationFrame(() => {
		t.forEach((e) => {
			e.isConnected && e.requestUpdate();
		});
	}));
}
function bt(e) {
	return fetch(e).then((t) => t.ok ? t : fetch(e, { cache: "reload" }));
}
var L, xt = e((() => {
	L = {};
}));
//#endregion
//#region src/common/helpers/long-press.js
function St(e, t, n) {
	n && (e.stopPropagation(), this._cancelLongPress(), this._longPressTriggered = !1, this._longPressTimer = setTimeout(() => {
		this._longPressTriggered = !0, this._handleAction(n, t);
	}, this._LONG_PRESS_DELAY));
}
function Ct() {
	this._longPressTimer &&= (clearTimeout(this._longPressTimer), null);
}
function wt(e) {
	return this._cancelLongPress(), this._longPressTriggered ? (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), !0) : !1;
}
var Tt = e((() => {}));
//#endregion
//#region src/common/helpers/templates.js
function Et(e, t) {
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
var Dt = e((() => {}));
//#endregion
//#region src/common/helpers/updates.js
function Ot(e, t, n = {}) {
	if (!e.has("hass") || e.has("_config") || e.has("_collapsed") || [...e.keys()].some((e) => e !== "hass") || n.hasTemplates) return !0;
	let r = e.get("hass"), i = this.hass;
	if (!r || !i) return !0;
	let a = [...new Set(t.filter(Boolean))];
	return !a.length && !n.includeZones ? !1 : a.some((e) => r.states?.[e] !== i.states?.[e]) ? !0 : n.includeZones ? At(r, i) : !1;
}
function kt(e) {
	return Object.keys(e || {}).some((e) => e.endsWith("_template"));
}
function At(e, t) {
	return [...new Set([...Object.keys(e.states || {}), ...Object.keys(t.states || {})].filter((e) => e.startsWith("zone.")))].some((n) => e.states?.[n] !== t.states?.[n]);
}
var jt = e((() => {}));
//#endregion
//#region src/common/helpers/suggestions.js
function Mt(e = "") {
	return e.split(".")[0] || "";
}
function Nt(e, t) {
	return e?.entities?.[t]?.area_id || "";
}
function Pt(e, t) {
	let n = e?.states?.[t]?.state;
	return n !== "" && Number.isFinite(Number(n));
}
var Ft = e((() => {})), R, z = e((() => {
	R = {};
}));
//#endregion
//#region src/common/helpers/default-actions.js
function It(e, t = "more-info") {
	let n = e?.split(".")[0];
	if (!n) return { action: t };
	let r = Lt[n];
	return r ? {
		action: "call-service",
		service: r,
		service_data: { entity_id: e }
	} : Rt.has(n) ? { action: "toggle" } : { action: t };
}
var Lt, Rt, zt = e((() => {
	Lt = {
		automation: "automation.trigger",
		button: "button.press",
		input_button: "input_button.press",
		scene: "scene.turn_on",
		script: "script.turn_on"
	}, Rt = new Set([
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
})), Bt, Vt, Ht, Ut, Wt, Gt, Kt, qt, Jt, Yt, Xt, Zt, Qt, $t, en, tn, nn, rn, an, on, sn, cn, ln, un, dn, fn, pn, mn, hn, gn, _n, vn, yn, bn, xn, Sn, Cn = e((() => {
	Bt = "Area", Vt = "Automations", Ht = "Away", Ut = "Buttons", Wt = "Cameras", Gt = "Card", Kt = "Disabled", qt = "Enabled", Jt = "Entity", Yt = "Files", Xt = "Home", Zt = "Icon", Qt = "Icons", $t = "Mode", en = "Person", tn = "Picker", nn = "Remove", rn = "Room", an = "Scenes", on = "Scripts", sn = "Security", cn = "Separator", ln = "Standard", un = "Status", dn = "Theme", fn = "Wrap", pn = "content", mn = "entity_id", hn = "navigate", gn = "none", _n = "path", vn = "popup", yn = "service", bn = "title", xn = "toggle", Sn = {
		"Accent Color": "Accent Color",
		"Accent OFF Color": "Accent OFF Color",
		"Accent ON Color": "Accent ON Color",
		"Action Button": "Action Button",
		"Actions Per Row": "Actions Per Row",
		All: "All",
		Area: Bt,
		Automations: Vt,
		Away: Ht,
		"Battery Entity 1": "Battery Entity 1",
		"Battery Entity 2": "Battery Entity 2",
		"Button {index}": "Button {index}",
		Buttons: Ut,
		Cameras: Wt,
		Card: Gt,
		"Card Action": "Card Action",
		"Choose colour": "Choose colour",
		"Choose icon": "Choose icon",
		"Curve Buttons": "Curve Buttons",
		"Decimal Places": "Decimal Places",
		Disabled: Kt,
		Enabled: qt,
		Entity: Jt,
		"ETA Entity": "ETA Entity",
		Files: Yt,
		"Hold Action": "Hold Action",
		Home: Xt,
		Icon: Zt,
		"Icon Only": "Icon Only",
		Icons: Qt,
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
		Mode: $t,
		"Move left": "Move left",
		"Move right": "Move right",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
		"OFF Color": "OFF Color",
		"OFF Icon": "OFF Icon",
		"ON Color": "ON Color",
		"ON Icon": "ON Icon",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Orbit Icons",
		"Orbit Room Card v{version}": "Orbit Room Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}",
		Person: en,
		"Person Entity": "Person Entity",
		Picker: tn,
		"Prefix Icon": "Prefix Icon",
		Remove: nn,
		Room: rn,
		"Room Name": "Room Name",
		"Room Navigation Path": "Room Navigation Path",
		Scenes: an,
		Scripts: on,
		Security: sn,
		"Separate Cards": "Separate Cards",
		Separator: cn,
		Standard: ln,
		"State Template": "State Template",
		Status: un,
		"Status {index}": "Status {index}",
		"Status Color": "Status Color",
		"Status Name": "Status Name",
		"Status Sensors": "Status Sensors",
		"Tap Action": "Tap Action",
		Theme: dn,
		"Tracker Entity": "Tracker Entity",
		Wrap: fn,
		"call-service": "call-service",
		content: pn,
		entity_id: mn,
		"more-info": "more-info",
		navigate: hn,
		none: gn,
		path: _n,
		popup: vn,
		service: yn,
		title: bn,
		toggle: xn
	};
})), wn, Tn, En, Dn, On, kn, An, jn, Mn, Nn, Pn, Fn, In, Ln, Rn, zn, Bn, Vn, Hn, Un, Wn, Gn, Kn, qn, Jn, Yn, Xn, Zn, Qn, $n, er, tr, nr, rr, ir, ar, or = e((() => {
	wn = "Area", Tn = "Automations", En = "Away", Dn = "Buttons", On = "Cameras", kn = "Card", An = "Disabled", jn = "Enabled", Mn = "Entity", Nn = "Files", Pn = "Home", Fn = "Icon", In = "Icons", Ln = "Mode", Rn = "Person", zn = "Picker", Bn = "Remove", Vn = "Room", Hn = "Scenes", Un = "Scripts", Wn = "Security", Gn = "Separator", Kn = "Standard", qn = "Status", Jn = "Theme", Yn = "Wrap", Xn = "content", Zn = "entity_id", Qn = "navigate", $n = "none", er = "path", tr = "popup", nr = "service", rr = "title", ir = "toggle", ar = {
		"Accent Color": "Accent Colour",
		"Accent OFF Color": "Accent OFF Colour",
		"Accent ON Color": "Accent ON Colour",
		"Action Button": "Action Button",
		"Actions Per Row": "Actions Per Row",
		All: "All",
		Area: wn,
		Automations: Tn,
		Away: En,
		"Battery Entity 1": "Battery Entity 1",
		"Battery Entity 2": "Battery Entity 2",
		"Button {index}": "Button {index}",
		Buttons: Dn,
		Cameras: On,
		Card: kn,
		"Card Action": "Card Action",
		"Choose colour": "Choose colour",
		"Choose icon": "Choose icon",
		"Curve Buttons": "Curve Buttons",
		"Decimal Places": "Decimal Places",
		Disabled: An,
		Enabled: jn,
		Entity: Mn,
		"ETA Entity": "ETA Entity",
		Files: Nn,
		"Hold Action": "Hold Action",
		Home: Pn,
		Icon: Fn,
		"Icon Only": "Icon Only",
		Icons: In,
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
		Mode: Ln,
		"Move left": "Move left",
		"Move right": "Move right",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
		"OFF Color": "OFF Colour",
		"OFF Icon": "OFF Icon",
		"ON Color": "ON Colour",
		"ON Icon": "ON Icon",
		"Orbit Action Card v{version}": "Orbit Action Card v{version}",
		"Orbit Icons": "Orbit Icons",
		"Orbit Room Card v{version}": "Orbit Room Card v{version}",
		"Orbit Status Card v{version}": "Orbit Status Card v{version}",
		Person: Rn,
		"Person Entity": "Person Entity",
		Picker: zn,
		"Prefix Icon": "Prefix Icon",
		Remove: Bn,
		Room: Vn,
		"Room Name": "Room Name",
		"Room Navigation Path": "Room Navigation Path",
		Scenes: Hn,
		Scripts: Un,
		Security: Wn,
		"Separate Cards": "Separate Cards",
		Separator: Gn,
		Standard: Kn,
		"State Template": "State Template",
		Status: qn,
		"Status {index}": "Status {index}",
		"Status Color": "Status Colour",
		"Status Name": "Status Name",
		"Status Sensors": "Status Sensors",
		"Tap Action": "Tap Action",
		Theme: Jn,
		"Tracker Entity": "Tracker Entity",
		Wrap: Yn,
		"call-service": "call-service",
		content: Xn,
		entity_id: Zn,
		"more-info": "more-info",
		navigate: Qn,
		none: $n,
		path: er,
		popup: tr,
		service: nr,
		title: rr,
		toggle: ir
	};
})), sr, cr, lr, ur, dr, fr, pr, mr, hr, gr, _r, vr, yr, br, xr, Sr, Cr, wr, Tr, Er, Dr, Or, kr, Ar, jr, Mr, Nr, Pr = e((() => {
	sr = "Alle", cr = "Bereich", lr = "Automatisierungen", ur = "Abwesend", dr = "Tasten", fr = "Kameras", pr = "Karte", mr = "Deaktiviert", hr = "Aktiviert", gr = "Entität", _r = "Dateien", vr = "Zuhause", yr = "Symbol", br = "Symbole", xr = "Modus", Sr = "Person", Cr = "Auswahl", wr = "Entfernen", Tr = "Raum", Er = "Szenen", Dr = "Skripte", Or = "Trennzeichen", kr = "Standard", Ar = "Status", jr = "Theme", Mr = "Umbrechen", Nr = {
		"Accent Color": "Akzentfarbe",
		"Accent OFF Color": "Akzentfarbe AUS",
		"Accent ON Color": "Akzentfarbe EIN",
		"Action Button": "Aktionstaste",
		"Actions Per Row": "Aktionen pro Zeile",
		All: sr,
		Area: cr,
		Automations: lr,
		Away: ur,
		"Battery Entity 1": "Batterie-Entität 1",
		"Battery Entity 2": "Batterie-Entität 2",
		"Button {index}": "Taste {index}",
		Buttons: dr,
		Cameras: fr,
		Card: pr,
		"Card Action": "Kartenaktion",
		"Choose colour": "Farbe auswählen",
		"Choose icon": "Symbol auswählen",
		"Curve Buttons": "Bogen-Tasten",
		"Decimal Places": "Dezimalstellen",
		Disabled: mr,
		Enabled: hr,
		Entity: gr,
		"ETA Entity": "ETA-Entität",
		Files: _r,
		"Hold Action": "Halten-Aktion",
		Home: vr,
		Icon: yr,
		"Icon Only": "Nur Symbol",
		Icons: br,
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
		Mode: xr,
		"Move left": "Nach links verschieben",
		"Move right": "Nach rechts verschieben",
		"OFF Color": "AUS-Farbe",
		"OFF Icon": "AUS-Symbol",
		"ON Color": "EIN-Farbe",
		"ON Icon": "EIN-Symbol",
		Person: Sr,
		"Person Entity": "Personen-Entität",
		Picker: Cr,
		"Prefix Icon": "Präfixsymbol",
		Remove: wr,
		Room: Tr,
		"Room Name": "Raumname",
		"Room Navigation Path": "Raum-Navigationspfad",
		Scenes: Er,
		Scripts: Dr,
		"Separate Cards": "Separate Karten",
		Separator: Or,
		Standard: kr,
		"State Template": "Zustandsvorlage",
		Status: Ar,
		"Status {index}": "Status {index}",
		"Status Color": "Statusfarbe",
		"Status Name": "Statusname",
		"Status Sensors": "Statussensoren",
		"Tap Action": "Tippen-Aktion",
		Theme: jr,
		"Tracker Entity": "Tracker-Entität",
		Wrap: Mr,
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "",
		"Orbit Action Card v{version}": "",
		"Orbit Icons": "",
		"Orbit Room Card v{version}": "",
		"Orbit Status Card v{version}": "",
		Security: "",
		"call-service": "",
		content: "",
		entity_id: "",
		"more-info": "",
		navigate: "",
		none: "",
		path: "",
		popup: "",
		service: "",
		title: "",
		toggle: ""
	};
})), Fr, Ir, Lr, Rr, zr, Br, Vr, Hr, Ur, Wr, Gr, Kr, qr, Jr, Yr, Xr, Zr, Qr, $r, ei, ti, ni, ri, ii, ai, oi, si, ci = e((() => {
	Fr = "Todos", Ir = "Área", Lr = "Automatizaciones", Rr = "Ausente", zr = "Botones", Br = "Cámaras", Vr = "Tarjeta", Hr = "Desactivado", Ur = "Activado", Wr = "Entidad", Gr = "Archivos", Kr = "En casa", qr = "Icono", Jr = "Iconos", Yr = "Modo", Xr = "Persona", Zr = "Selector", Qr = "Eliminar", $r = "Habitación", ei = "Escenas", ti = "Scripts", ni = "Separador", ri = "Estándar", ii = "Estado", ai = "Tema", oi = "Ajustar", si = {
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
		"Choose colour": "Elegir color",
		"Choose icon": "Elegir icono",
		"Curve Buttons": "Botones curvos",
		"Decimal Places": "Decimales",
		Disabled: Hr,
		Enabled: Ur,
		Entity: Wr,
		"ETA Entity": "Entidad ETA",
		Files: Gr,
		"Hold Action": "Acción al mantener",
		Home: Kr,
		Icon: qr,
		"Icon Only": "Solo icono",
		Icons: Jr,
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
		Mode: Yr,
		"Move left": "Mover a la izquierda",
		"Move right": "Mover a la derecha",
		"OFF Color": "Color apagado",
		"OFF Icon": "Icono apagado",
		"ON Color": "Color encendido",
		"ON Icon": "Icono encendido",
		Person: Xr,
		"Person Entity": "Entidad de persona",
		Picker: Zr,
		"Prefix Icon": "Icono de prefijo",
		Remove: Qr,
		Room: $r,
		"Room Name": "Nombre de habitación",
		"Room Navigation Path": "Ruta de navegación de habitación",
		Scenes: ei,
		Scripts: ti,
		"Separate Cards": "Tarjetas separadas",
		Separator: ni,
		Standard: ri,
		"State Template": "Plantilla de estado",
		Status: ii,
		"Status {index}": "Estado {index}",
		"Status Color": "Color de estado",
		"Status Name": "Nombre de estado",
		"Status Sensors": "Sensores de estado",
		"Tap Action": "Acción al tocar",
		Theme: ai,
		"Tracker Entity": "Entidad de seguimiento",
		Wrap: oi,
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "",
		"Orbit Action Card v{version}": "",
		"Orbit Icons": "",
		"Orbit Room Card v{version}": "",
		"Orbit Status Card v{version}": "",
		Security: "",
		"call-service": "",
		content: "",
		entity_id: "",
		"more-info": "",
		navigate: "",
		none: "",
		path: "",
		popup: "",
		service: "",
		title: "",
		toggle: ""
	};
})), li, ui, di, fi, pi, mi, hi, gi, _i, vi, yi, bi, xi, Si, Ci, wi, Ti, Ei, Di, Oi, ki, Ai, ji, Mi, Ni, Pi, Fi, Ii = e((() => {
	li = "Toutes", ui = "Zone", di = "Automatisations", fi = "Absent", pi = "Boutons", mi = "Caméras", hi = "Carte", gi = "Désactivé", _i = "Activé", vi = "Entité", yi = "Fichiers", bi = "À la maison", xi = "Icône", Si = "Icônes", Ci = "Mode", wi = "Personne", Ti = "Sélecteur", Ei = "Supprimer", Di = "Pièce", Oi = "Scènes", ki = "Scripts", Ai = "Séparateur", ji = "Standard", Mi = "Statut", Ni = "Thème", Pi = "Retour à la ligne", Fi = {
		"Accent Color": "Couleur d'accent",
		"Accent OFF Color": "Couleur d'accent OFF",
		"Accent ON Color": "Couleur d'accent ON",
		"Action Button": "Bouton d'action",
		"Actions Per Row": "Actions par ligne",
		All: li,
		Area: ui,
		Automations: di,
		Away: fi,
		"Battery Entity 1": "Entité batterie 1",
		"Battery Entity 2": "Entité batterie 2",
		"Button {index}": "Bouton {index}",
		Buttons: pi,
		Cameras: mi,
		Card: hi,
		"Card Action": "Action de la carte",
		"Choose colour": "Choisir une couleur",
		"Choose icon": "Choisir une icône",
		"Curve Buttons": "Boutons courbes",
		"Decimal Places": "Décimales",
		Disabled: gi,
		Enabled: _i,
		Entity: vi,
		"ETA Entity": "Entité ETA",
		Files: yi,
		"Hold Action": "Action d'appui long",
		Home: bi,
		Icon: xi,
		"Icon Only": "Icône seule",
		Icons: Si,
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
		Mode: Ci,
		"Move left": "Déplacer à gauche",
		"Move right": "Déplacer à droite",
		"OFF Color": "Couleur OFF",
		"OFF Icon": "Icône OFF",
		"ON Color": "Couleur ON",
		"ON Icon": "Icône ON",
		Person: wi,
		"Person Entity": "Entité personne",
		Picker: Ti,
		"Prefix Icon": "Icône de préfixe",
		Remove: Ei,
		Room: Di,
		"Room Name": "Nom de la pièce",
		"Room Navigation Path": "Chemin de navigation de la pièce",
		Scenes: Oi,
		Scripts: ki,
		"Separate Cards": "Cartes séparées",
		Separator: Ai,
		Standard: ji,
		"State Template": "Modèle d'état",
		Status: Mi,
		"Status {index}": "Statut {index}",
		"Status Color": "Couleur du statut",
		"Status Name": "Nom du statut",
		"Status Sensors": "Capteurs de statut",
		"Tap Action": "Action au toucher",
		Theme: Ni,
		"Tracker Entity": "Entité de suivi",
		Wrap: Pi,
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "",
		"Orbit Action Card v{version}": "",
		"Orbit Icons": "",
		"Orbit Room Card v{version}": "",
		"Orbit Status Card v{version}": "",
		Security: "",
		"call-service": "",
		content: "",
		entity_id: "",
		"more-info": "",
		navigate: "",
		none: "",
		path: "",
		popup: "",
		service: "",
		title: "",
		toggle: ""
	};
})), Li, Ri, zi, Bi, Vi, Hi, Ui, Wi, Gi, Ki, qi, Ji, Yi, Xi, Zi, Qi, $i, ea, ta, na, ra, ia, aa, oa, sa, ca, la, ua = e((() => {
	Li = "Tutto", Ri = "Area", zi = "Automazioni", Bi = "Assente", Vi = "Pulsanti", Hi = "Telecamere", Ui = "Scheda", Wi = "Disabilitato", Gi = "Abilitato", Ki = "Entità", qi = "File", Ji = "A casa", Yi = "Icona", Xi = "Icone", Zi = "Modalità", Qi = "Persona", $i = "Selettore", ea = "Rimuovi", ta = "Stanza", na = "Scene", ra = "Script", ia = "Separatore", aa = "Standard", oa = "Stato", sa = "Tema", ca = "A capo", la = {
		"Accent Color": "Colore accento",
		"Accent OFF Color": "Colore accento OFF",
		"Accent ON Color": "Colore accento ON",
		"Action Button": "Pulsante azione",
		"Actions Per Row": "Azioni per riga",
		All: Li,
		Area: Ri,
		Automations: zi,
		Away: Bi,
		"Battery Entity 1": "Entità batteria 1",
		"Battery Entity 2": "Entità batteria 2",
		"Button {index}": "Pulsante {index}",
		Buttons: Vi,
		Cameras: Hi,
		Card: Ui,
		"Card Action": "Azione scheda",
		"Choose colour": "Scegli colore",
		"Choose icon": "Scegli icona",
		"Curve Buttons": "Pulsanti curvi",
		"Decimal Places": "Decimali",
		Disabled: Wi,
		Enabled: Gi,
		Entity: Ki,
		"ETA Entity": "Entità ETA",
		Files: qi,
		"Hold Action": "Azione pressione lunga",
		Home: Ji,
		Icon: Yi,
		"Icon Only": "Solo icona",
		Icons: Xi,
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
		Mode: Zi,
		"Move left": "Sposta a sinistra",
		"Move right": "Sposta a destra",
		"OFF Color": "Colore OFF",
		"OFF Icon": "Icona OFF",
		"ON Color": "Colore ON",
		"ON Icon": "Icona ON",
		Person: Qi,
		"Person Entity": "Entità persona",
		Picker: $i,
		"Prefix Icon": "Icona prefisso",
		Remove: ea,
		Room: ta,
		"Room Name": "Nome stanza",
		"Room Navigation Path": "Percorso navigazione stanza",
		Scenes: na,
		Scripts: ra,
		"Separate Cards": "Schede separate",
		Separator: ia,
		Standard: aa,
		"State Template": "Template stato",
		Status: oa,
		"Status {index}": "Stato {index}",
		"Status Color": "Colore stato",
		"Status Name": "Nome stato",
		"Status Sensors": "Sensori stato",
		"Tap Action": "Azione tocco",
		Theme: sa,
		"Tracker Entity": "Entità tracker",
		Wrap: ca,
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "",
		"Orbit Action Card v{version}": "",
		"Orbit Icons": "",
		"Orbit Room Card v{version}": "",
		"Orbit Status Card v{version}": "",
		Security: "",
		"call-service": "",
		content: "",
		entity_id: "",
		"more-info": "",
		navigate: "",
		none: "",
		path: "",
		popup: "",
		service: "",
		title: "",
		toggle: ""
	};
})), da, fa, pa, ma, ha, ga, _a, va, ya, ba, xa, Sa, Ca, wa, Ta, Ea, Da, Oa, ka, Aa, ja, Ma, Na, Pa, Fa, Ia, La, Ra = e((() => {
	da = "Alles", fa = "Gebied", pa = "Automatiseringen", ma = "Afwezig", ha = "Knoppen", ga = "Camera's", _a = "Kaart", va = "Uitgeschakeld", ya = "Ingeschakeld", ba = "Entiteit", xa = "Bestanden", Sa = "Thuis", Ca = "Icoon", wa = "Iconen", Ta = "Modus", Ea = "Persoon", Da = "Kiezer", Oa = "Verwijderen", ka = "Ruimte", Aa = "Scènes", ja = "Scripts", Ma = "Scheidingsteken", Na = "Standaard", Pa = "Status", Fa = "Thema", Ia = "Teruglopen", La = {
		"Accent Color": "Accentkleur",
		"Accent OFF Color": "Accentkleur UIT",
		"Accent ON Color": "Accentkleur AAN",
		"Action Button": "Actieknop",
		"Actions Per Row": "Acties per rij",
		All: da,
		Area: fa,
		Automations: pa,
		Away: ma,
		"Battery Entity 1": "Batterij-entiteit 1",
		"Battery Entity 2": "Batterij-entiteit 2",
		"Button {index}": "Knop {index}",
		Buttons: ha,
		Cameras: ga,
		Card: _a,
		"Card Action": "Kaartactie",
		"Choose colour": "Kleur kiezen",
		"Choose icon": "Icoon kiezen",
		"Curve Buttons": "Gebogen knoppen",
		"Decimal Places": "Decimalen",
		Disabled: va,
		Enabled: ya,
		Entity: ba,
		"ETA Entity": "ETA-entiteit",
		Files: xa,
		"Hold Action": "Vasthoudactie",
		Home: Sa,
		Icon: Ca,
		"Icon Only": "Alleen icoon",
		Icons: wa,
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
		Mode: Ta,
		"Move left": "Naar links verplaatsen",
		"Move right": "Naar rechts verplaatsen",
		"OFF Color": "UIT-kleur",
		"OFF Icon": "UIT-icoon",
		"ON Color": "AAN-kleur",
		"ON Icon": "AAN-icoon",
		Person: Ea,
		"Person Entity": "Persoon-entiteit",
		Picker: Da,
		"Prefix Icon": "Prefix-icoon",
		Remove: Oa,
		Room: ka,
		"Room Name": "Ruimtenaam",
		"Room Navigation Path": "Navigatiepad ruimte",
		Scenes: Aa,
		Scripts: ja,
		"Separate Cards": "Aparte kaarten",
		Separator: Ma,
		Standard: Na,
		"State Template": "Statussjabloon",
		Status: Pa,
		"Status {index}": "Status {index}",
		"Status Color": "Statuskleur",
		"Status Name": "Statusnaam",
		"Status Sensors": "Statussensoren",
		"Tap Action": "Tikactie",
		Theme: Fa,
		"Tracker Entity": "Tracker-entiteit",
		Wrap: Ia,
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "",
		"Orbit Action Card v{version}": "",
		"Orbit Icons": "",
		"Orbit Room Card v{version}": "",
		"Orbit Status Card v{version}": "",
		Security: "",
		"call-service": "",
		content: "",
		entity_id: "",
		"more-info": "",
		navigate: "",
		none: "",
		path: "",
		popup: "",
		service: "",
		title: "",
		toggle: ""
	};
})), za, Ba, Va, Ha, Ua, Wa, Ga, Ka, qa, Ja, Ya, Xa, Za, Qa, $a, eo, to, no, ro, io, ao, oo, so, co, lo, uo, fo, po = e((() => {
	za = "Todos", Ba = "Área", Va = "Automações", Ha = "Ausente", Ua = "Botões", Wa = "Câmeras", Ga = "Cartão", Ka = "Desativado", qa = "Ativado", Ja = "Entidade", Ya = "Arquivos", Xa = "Em casa", Za = "Ícone", Qa = "Ícones", $a = "Modo", eo = "Pessoa", to = "Seletor", no = "Remover", ro = "Cômodo", io = "Cenas", ao = "Scripts", oo = "Separador", so = "Padrão", co = "Status", lo = "Tema", uo = "Quebrar linha", fo = {
		"Accent Color": "Cor de destaque",
		"Accent OFF Color": "Cor de destaque desligado",
		"Accent ON Color": "Cor de destaque ligado",
		"Action Button": "Botão de ação",
		"Actions Per Row": "Ações por linha",
		All: za,
		Area: Ba,
		Automations: Va,
		Away: Ha,
		"Battery Entity 1": "Entidade de bateria 1",
		"Battery Entity 2": "Entidade de bateria 2",
		"Button {index}": "Botão {index}",
		Buttons: Ua,
		Cameras: Wa,
		Card: Ga,
		"Card Action": "Ação do cartão",
		"Choose colour": "Escolher cor",
		"Choose icon": "Escolher ícone",
		"Curve Buttons": "Botões curvos",
		"Decimal Places": "Casas decimais",
		Disabled: Ka,
		Enabled: qa,
		Entity: Ja,
		"ETA Entity": "Entidade ETA",
		Files: Ya,
		"Hold Action": "Ação ao segurar",
		Home: Xa,
		Icon: Za,
		"Icon Only": "Somente ícone",
		Icons: Qa,
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
		Mode: $a,
		"Move left": "Mover para a esquerda",
		"Move right": "Mover para a direita",
		"OFF Color": "Cor desligado",
		"OFF Icon": "Ícone desligado",
		"ON Color": "Cor ligado",
		"ON Icon": "Ícone ligado",
		Person: eo,
		"Person Entity": "Entidade de pessoa",
		Picker: to,
		"Prefix Icon": "Ícone de prefixo",
		Remove: no,
		Room: ro,
		"Room Name": "Nome do cômodo",
		"Room Navigation Path": "Caminho de navegação do cômodo",
		Scenes: io,
		Scripts: ao,
		"Separate Cards": "Cartões separados",
		Separator: oo,
		Standard: so,
		"State Template": "Modelo de estado",
		Status: co,
		"Status {index}": "Status {index}",
		"Status Color": "Cor do status",
		"Status Name": "Nome do status",
		"Status Sensors": "Sensores de status",
		"Tap Action": "Ação ao tocar",
		Theme: lo,
		"Tracker Entity": "Entidade de rastreamento",
		Wrap: uo,
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "",
		"Orbit Action Card v{version}": "",
		"Orbit Icons": "",
		"Orbit Room Card v{version}": "",
		"Orbit Status Card v{version}": "",
		Security: "",
		"call-service": "",
		content: "",
		entity_id: "",
		"more-info": "",
		navigate: "",
		none: "",
		path: "",
		popup: "",
		service: "",
		title: "",
		toggle: ""
	};
}));
//#endregion
//#region src/common/localize.js
function B(e, t, n = {}) {
	let r = ho(e), i = r.replace("_", "-"), a = r.split("-")[0], o = mo(r, t) || mo(i, t) || mo(a, t) || go.en[t] || t;
	return Object.entries(n).reduce((e, [t, n]) => e.replaceAll(`{${t}}`, n ?? ""), o);
}
function mo(e, t) {
	let n = go[e]?.[t];
	return n === "" ? null : n;
}
function ho(e) {
	return (e?.locale?.language || e?.language || "en").toLowerCase();
}
var go, V = e((() => {
	Cn(), or(), Pr(), ci(), Ii(), ua(), Ra(), po(), go = {
		de: Nr,
		en: Sn,
		"en-gb": ar,
		en_gb: ar,
		es: si,
		fr: Fi,
		it: la,
		nl: La,
		"pt-br": fo,
		pt_br: fo
	};
}));
//#endregion
//#region src/cards/room/helpers/lifecycle.js
function _o(e) {
	if (!e.has("_config") && !e.has("hass")) return;
	this._cardName = this._getCardName(B(this.hass, "Room"));
	let t = this._config.main_entity || this._config.entity, n = this._config.area, r = t && this.hass ? this.hass.states[t] : null, i = r ? this._getEntityActiveState(r) : !1;
	this._iconColor = this._getMainIconColor(r, i);
	let a = this._config.main_entity_icon, o = this._config.main_entity_icon_on, s = this._config.main_entity_icon_off, c = "mdi:sofa";
	r ? c = r.attributes?.icon || this._getDefaultDomainIcon(r.entity_id.split(".")[0], r) || "mdi:sofa" : n && this.hass?.areas?.[n] && (c = this.hass.areas[n].icon || "mdi:sofa");
	let l = i && o ? "main_entity_icon_on" : !i && s ? "main_entity_icon_off" : a ? "main_entity_icon" : "";
	this._icon = (i ? o : s) || a || c, this._iconSvgForceColor = l ? this._getSvgColorOverride(l) : !0, this._statusItems = vo.call(this), this._buttonModels = xo.call(this), this._curveButtonModels = So.call(this), this._actionButtonModel = Co.call(this);
}
function vo() {
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
			text: bo.call(this, n, this._config[`status${e}_decimal_places`]),
			icon: r,
			iconPath: this._isImageIcon(r) ? this._resolveIconPath(r) : "",
			isImage: this._isImageIcon(r),
			isHaIcon: yo(r)
		};
	}).filter(Boolean);
}
function yo(e) {
	return /^[a-z0-9_-]+:/i.test(e || "");
}
function bo(e, t) {
	if (!e) return "—";
	if (t === void 0 || t === "") return this.formatState(e);
	let n = Number(t), r = Number(e.state);
	if (!Number.isFinite(n) || !Number.isFinite(r)) return this.formatState(e);
	let i = e.attributes.unit_of_measurement || "";
	return `${r.toFixed(Math.max(0, n))}${i}`;
}
function xo() {
	return [
		this._config.button1,
		this._config.button2,
		this._config.button3,
		this._config.button4
	].filter(Boolean).map((e, t) => wo.call(this, "button", e, t, {
		defaultAction: { action: "toggle" },
		defaultHoldAction: { action: "more-info" },
		getIconColor: Oo,
		getBackgroundColor: Do
	})).filter(Boolean);
}
function So() {
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
		let i = wo.call(this, "curve_button", t, r, {
			defaultAction: { action: "more-info" },
			defaultHoldAction: null,
			getIconColor: Ao,
			getBackgroundColor: null
		});
		return i ? (i.position = e ? r : n.indexOf(t), i) : null;
	}).filter(Boolean);
}
function Co() {
	let e = this._config.action_button;
	return e ? wo.call(this, "action_button", e, 0, {
		key: "action_button",
		defaultAction: It(e),
		defaultHoldAction: null,
		getIconColor: jo,
		getBackgroundColor: null
	}) : null;
}
function wo(e, t, n, r) {
	let i = this.hass?.states[t];
	if (!i) return null;
	let a = r.key || `${e}${n + 1}`, o = this._config?.[`${a}_state_template`], s = this._evaluateStateTemplate(o, t), c = s == null ? this._getEntityActiveState(i) : s === !0 || s === "on", l = Eo.call(this, a, t, i, c), u = this._isImageIcon(l);
	return {
		entityId: t,
		holdAction: this._config?.[`${a}_hold_action`] || r.defaultHoldAction,
		tapAction: this._config?.[`${a}_tap_action`] || r.defaultAction,
		backgroundColor: r.getBackgroundColor ? r.getBackgroundColor.call(this, a, i, c) : "",
		icon: l,
		iconColor: r.getIconColor.call(this, a, i, c),
		iconPath: u ? this._resolveIconPath(l) : "",
		svgForceColor: To.call(this, a, c),
		isImage: u
	};
}
function To(e, t) {
	let n = this._config?.[`${e}_icon`], r = t && this._config?.[`${e}_icon_on`] ? `${e}_icon_on` : !t && this._config?.[`${e}_icon_off`] ? `${e}_icon_off` : n ? `${e}_icon` : "";
	return r ? this._getSvgColorOverride(r) : !0;
}
function Eo(e, t, n, r) {
	let i = this._config?.[`${e}_icon`], a = this._config?.[`${e}_icon_on`], o = this._config?.[`${e}_icon_off`], s = t.split(".")[0], c = this._getDefaultDomainIcon(s, n), l = n?.attributes?.icon || this.hass?.entities?.[t]?.icon;
	return (r ? a : o) || i || l || c || "mdi:help-circle";
}
function Do(e, t, n) {
	if (n) return this._computeButtonBackground(ko.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return F(r) ? `color-mix(in srgb, transparent, ${r} 90%)` : !r || r === "theme" ? "rgba(var(--color-theme),0.05)" : P(r, 10);
}
function Oo(e, t, n) {
	if (n) return this._computeFullColor(ko.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return r.startsWith("rgba(") ? r : F(r) ? `color-mix(in srgb, transparent, ${r} 80%)` : P(r, 20);
}
function ko(e, t) {
	let n = this._config[`${e}_on_color`] || "theme";
	return n === "light" ? this._getEntityColor(t) || this._config.accent_color || "theme" : n;
}
function Ao(e, t, n) {
	let r = this._config.accent_color || "theme";
	return r === "theme" ? n ? "rgba(var(--color-theme),0.7)" : "rgba(var(--color-theme),0.2)" : F(r) ? n ? r : `color-mix(in srgb, ${r} 40%, transparent)` : n ? this._computeFullColor(r) : P(r, 40);
}
function jo(e, t, n) {
	let r = n ? this._config[`${e}_on_color`] : this._config[`${e}_off_color`];
	return r && r !== "theme" ? Oo.call(this, e, t, n) : Ao.call(this, e, t, n);
}
var Mo = e((() => {
	rt(), zt(), V();
})), No, Po, Fo, Io = e((() => {
	No = {
		ATTRIBUTE: 1,
		CHILD: 2,
		PROPERTY: 3,
		BOOLEAN_ATTRIBUTE: 4,
		EVENT: 5,
		ELEMENT: 6
	}, Po = (e) => (...t) => ({
		_$litDirective$: e,
		values: t
	}), Fo = class {
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
})), Lo, H, Ro = e((() => {
	j(), Io(), Lo = class extends Fo {
		constructor(e) {
			if (super(e), this.it = D, e.type !== No.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
		}
		render(e) {
			if (e === D || e == null) return this._t = void 0, this.it = e;
			if (e === E) return e;
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
	}, Lo.directiveName = "unsafeHTML", Lo.resultType = 1, H = Po(Lo);
})), U = e((() => {
	Ro();
}));
//#endregion
//#region src/cards/room/renders/buttons.js
function zo(e) {
	return e ? T`
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
        ${e.isImage ? T`
              <div
                class="button-image-icon"
                style="color:${e.iconColor};"
              >
                ${e.iconPath ? H(this._getInlineSvg(e.iconPath, e.svgForceColor)) : ""}
              </div>
            ` : T`
              <ha-icon
                .icon=${e.icon}
                style="color:${e.iconColor};"
              ></ha-icon>
            `}
      </button>
    ` : null;
}
var Bo = e((() => {
	N(), U();
}));
//#endregion
//#region src/cards/room/renders/room-card.js
function Vo() {
	let e = this._buttonModels || [], t = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", n = t ? this._getInlineSvg(t, this._iconSvgForceColor) : "";
	return T`
    <ha-card tabindex="0" @click=${this._handleTap}>
      <div class="container">
        <div class="content">

            <div class="header ${e.length >= 3 ? "compressed" : ""}">
              <div class="card-name" style="color:${this._roomColor}">
                ${this._cardName}
            </div>

            <div class="status" style="color:${this._statusColor}">
              ${Ho.call(this)}
            </div>
          </div>

          ${e.length ? T`
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

          ${this._isImageIcon(this._icon) ? T`
                <div
                  class="main-image-icon"
                  style="color:${this._iconColor};"
                >
                  ${n ? H(n) : T`<img src=${t} alt="" />`}
                </div>
              ` : T`
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
function Ho() {
	let e = this._statusItems || [];
	if (!e.length) return this._statusText || "";
	let t = this._config?.status_separator || "|";
	return e.map((e, n) => T`
    ${n > 0 ? T`
          <span class="status-separator">
            ${t}
          </span>
        ` : ""}
    <span class="status-item">
      ${Uo.call(this, e)}
      <span>${e.text}</span>
    </span>
  `);
}
function Uo(e) {
	return e.icon ? e.isImage ? T`
      <span class="status-prefix-icon status-prefix-image">
        ${e.iconPath ? H(this._getInlineSvg(e.iconPath, !0)) : ""}
      </span>
    ` : e.isHaIcon ? T`
      <ha-icon
        class="status-prefix-icon"
        .icon=${e.icon}
      ></ha-icon>
    ` : T`
    <span class="status-prefix-text">
      ${e.icon}
    </span>
  ` : "";
}
var Wo = e((() => {
	N(), U();
})), Go, Ko, qo, W, G, Jo, Yo, Xo, Zo, Qo = e((() => {
	j(), {I: Go} = Fe, Ko = (e) => e, qo = () => document.createComment(""), W = (e, t, n) => {
		let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
		if (n === void 0) n = new Go(r.insertBefore(qo(), i), r.insertBefore(qo(), i), e, e.options);
		else {
			let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
			if (o) {
				let t;
				n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
			}
			if (t !== i || o) {
				let e = n._$AA;
				for (; e !== t;) {
					let t = Ko(e).nextSibling;
					Ko(r).insertBefore(e, i), e = t;
				}
			}
		}
		return n;
	}, G = (e, t, n = e) => (e._$AI(t, n), e), Jo = {}, Yo = (e, t = Jo) => e._$AH = t, Xo = (e) => e._$AH, Zo = (e) => {
		e._$AR(), e._$AA.remove();
	};
})), $o, es, ts = e((() => {
	j(), Io(), Qo(), $o = (e, t, n) => {
		let r = /* @__PURE__ */ new Map();
		for (let i = t; i <= n; i++) r.set(e[i], i);
		return r;
	}, es = Po(class extends Fo {
		constructor(e) {
			if (super(e), e.type !== No.CHILD) throw Error("repeat() can only be used in text expressions");
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
			let i = Xo(e), { values: a, keys: o } = this.dt(t, n, r);
			if (!Array.isArray(i)) return this.ut = o, a;
			let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
			for (; d <= f && p <= m;) if (i[d] === null) d++;
			else if (i[f] === null) f--;
			else if (s[d] === o[p]) c[p] = G(i[d], a[p]), d++, p++;
			else if (s[f] === o[m]) c[m] = G(i[f], a[m]), f--, m--;
			else if (s[d] === o[m]) c[m] = G(i[d], a[m]), W(e, c[m + 1], i[d]), d++, m--;
			else if (s[f] === o[p]) c[p] = G(i[f], a[p]), W(e, i[d], i[f]), f--, p++;
			else if (l === void 0 && (l = $o(o, p, m), u = $o(s, d, f)), l.has(s[d])) if (l.has(s[f])) {
				let t = u.get(o[p]), n = t === void 0 ? null : i[t];
				if (n === null) {
					let t = W(e, i[d]);
					G(t, a[p]), c[p] = t;
				} else c[p] = G(n, a[p]), W(e, i[d], n), i[t] = null;
				p++;
			} else Zo(i[f]), f--;
			else Zo(i[d]), d++;
			for (; p <= m;) {
				let t = W(e, c[m + 1]);
				G(t, a[p]), c[p++] = t;
			}
			for (; d <= f;) {
				let e = i[d++];
				e !== null && Zo(e);
			}
			return this.ut = o, Yo(e, c), E;
		}
	});
})), ns = e((() => {
	ts();
}));
//#endregion
//#region src/cards/room/renders/curve-buttons.js
function rs() {
	let e = this._curveButtonModels || [], t = this._actionButtonModel;
	return T`
      <div class="curve-buttons">

        ${es(e, (e, t) => t, (e) => e.empty ? T`
              <div class="curve-button pos-${e.position}"></div>
            ` : T`
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
              ${e.isImage ? T`
                    <div
                      class="curve-image-icon"
                      style="color:${e.iconColor};"
                    >
                      ${H(this._getInlineSvg(e.iconPath, e.svgForceColor))}
                    </div>
                  ` : T`
                    <ha-icon
                      .icon=${e.icon}
                      style="color:${e.iconColor};"
                    ></ha-icon>
                  `}
            </button>
          `)}

      ${t ? is.call(this, t) : ""}

      </div>
    `;
}
function is(e) {
	return T`
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
      ${e.isImage ? T`
            <div
              class="curve-image-icon"
              style="color:${e.iconColor};"
            >
              ${H(this._getInlineSvg(e.iconPath, e.svgForceColor))}
            </div>
          ` : T`
            <ha-icon
              .icon=${e.icon}
              style="color:${e.iconColor};"
            ></ha-icon>
          `}
    </button>
  `;
}
var as = e((() => {
	N(), ns(), U();
})), os, ss = e((() => {
	N(), os = c`
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
})), cs, ls = e((() => {
	N(), cs = c`
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
})), us, ds = e((() => {
	N(), us = c`
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
})), fs, ps = e((() => {
	N(), fs = c`
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
})), ms, hs = e((() => {
	N(), ms = c`
  ha-card {
    aspect-ratio: 1 / 1;
  }

  .container {
    --button-area-width: clamp(46px, 23.5cqw, 210px);
  }
`;
})), gs, _s = e((() => {
	N(), gs = c`
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
})), vs, ys = e((() => {
	N(), vs = c`
  .curve-buttons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 4;
  }
`;
})), bs, xs = e((() => {
	N(), bs = c`
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
})), Ss, Cs = e((() => {
	N(), Ss = c`
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
})), ws, Ts = e((() => {
	N(), ws = c`
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
})), Es, Ds = e((() => {
	N(), Es = c`
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
})), Os, ks = e((() => {
	N(), Os = c`
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
})), As, js = e((() => {
	ss(), ls(), ds(), ps(), hs(), _s(), ys(), xs(), Cs(), Ts(), Ds(), ks(), As = [
		cs,
		os,
		us,
		ms,
		fs,
		Os,
		ws,
		Es,
		gs,
		vs,
		bs,
		Ss
	];
}));
//#endregion
//#region src/common/editor/helpers/icon.js
function K(e, t) {
	return e._t ? e._t(t) : t;
}
function Ms(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".gif") || t.endsWith(".webp");
}
function Ns(e) {
	return e ? e.startsWith("orbit:") ? Ps(e.slice(6)) : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function Ps(e) {
	let t = import.meta.url.split("?")[0];
	return `${t.slice(0, t.lastIndexOf("/") + 1)}icons/${e}`;
}
function Fs(e, t, n) {
	let r = this._config?.[t] || "", i = `${this._iconPickerPrefix || "icon"}-${t}`, a = this._iconPickerKey === i, o = this._iconPickerTab || "ha", s = r && this._isImageIcon(r) ? this._resolveIconPath(r) : "", c = s && this._getInlineSvg ? this._getInlineSvg(s) : "";
	return T`
    <div class="field">
      <label>${K(this, e)}</label>

      <div class="icon-input-row">

        <input
          .value=${r}
          placeholder=${n}
          @input=${(e) => this._handleConfigUpdate(t, e.target.value)}
        />

        <div
          class="icon-preview"
          title=${K(this, "Choose icon")}
          @click=${(e) => {
		e.preventDefault(), e.stopPropagation(), this._iconPickerKey = a ? "" : i, this._iconPickerTab = this._isImageIcon(r) ? "files" : "ha", a || this._loadLocalIconFiles?.(r), this.requestUpdate?.();
	}}
        >

          ${r ? this._isImageIcon(r) ? T`
                  <span class="preview-image-stack">
                    ${c ? T`
                          <span class="preview-svg">
                            ${H(c)}
                          </span>
                        ` : T`
                          <img
                            src=${s}
                            class="preview-image"
                            alt=""
                          />
                        `}
                  </span>
                ` : T`
                  <ha-icon
                    .icon=${r}
                  ></ha-icon>
                ` : T`
                <ha-icon
                  icon="mdi:image-outline"
                ></ha-icon>
              `}
        </div>

        ${a ? T`
              <div
                class="icon-popover"
                @click=${(e) => e.stopPropagation()}
              >
                <div class="icon-tabs">
                  <button
                    type="button"
                    class=${o === "ha" ? "active" : ""}
                    @click=${() => {
		this._iconPickerTab = "ha";
	}}
                  >
                    ${K(this, "Icons")}
                  </button>
                  <button
                    type="button"
                    class=${o === "files" ? "active" : ""}
                    @click=${() => {
		this._iconPickerTab = "files", this._loadLocalIconFiles?.(r);
	}}
                  >
                    ${K(this, "Files")}
                  </button>
                </div>

                ${o === "files" ? Rs.call(this, t, r) : Ls.call(this, t, r)}
              </div>
            ` : ""}

      </div>
    </div>
  `;
}
async function Is(e = "") {
	let t = Js(e);
	this._localIconFilesLoading = !0, this._orbitIconFilesLoading = !0, this.requestUpdate();
	let [n, r] = await Promise.all([Vs(), Hs()]);
	this._orbitIconFiles = Xs(n), this._localIconFiles = Xs([t?.source === "local" || !t?.source ? t : null, ...r]), this._orbitIconFilesLoading = !1, this._localIconFilesLoading = !1, this.requestUpdate();
}
function Ls(e, t) {
	return T`
    <ha-icon-picker
      .hass=${this.hass}
      .value=${t && !this._isImageIcon(t) ? t : ""}
      @value-changed=${(t) => {
		this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-icon-picker>
  `;
}
function Rs(e, t) {
	let n = this._orbitIconFiles || [], r = this._localIconFiles || [];
	return this._orbitIconFilesLoading || this._localIconFilesLoading ? T`
      <div class="icon-picker-note">${K(this, "Loading files...")}</div>
    ` : !n.length && !r.length ? T`
      <div class="icon-picker-note">
        ${K(this, "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.")}
      </div>
    ` : T`
    ${n.length ? zs.call(this, K(this, "Orbit Icons"), e, n, t) : ""}

    ${r.length ? zs.call(this, K(this, "Local Icons"), e, r, t) : ""}
  `;
}
function zs(e, t, n, r) {
	return T`
    <div class="file-icon-section">
      <div class="file-icon-section-title">${e}</div>
      <div class="file-icon-grid">
        ${n.map((e) => Bs.call(this, t, e, r))}
      </div>
    </div>
  `;
}
function Bs(e, t, n) {
	let r = Ys(t), i = this._resolveIconPath(r), a = this._getInlineSvg ? this._getInlineSvg(i) : "";
	return T`
    <button
      type="button"
      class=${n === r || n === t.file || n === i ? "file-icon-option active" : "file-icon-option"}
      title=${t.name || t.file}
      @click=${() => {
		this._handleConfigUpdate(e, r), this._iconPickerKey = "";
	}}
    >
      <span class="file-icon-preview">
        ${a ? T`${H(a)}` : T`
              <img src=${i} alt="" />
            `}
      </span>
      <span>${t.name || t.file}</span>
    </button>
  `;
}
async function Vs() {
	return (await Us([Ps("manifest.json"), Ps("orbit-icons.json")])).map((e) => ({
		...e,
		source: "orbit"
	}));
}
async function Hs() {
	let e = Array.isArray(window.ORBIT_ICON_FILES) ? window.ORBIT_ICON_FILES : [], t = await Us([
		"/local/icons/manifest.json",
		"/local/icons/orbit-icons.json",
		"/local/icons/icons.json"
	]), n = await Ws();
	return [
		...e,
		...t,
		...n
	].filter(Ks).map((e) => qs(e, "local"));
}
async function Us(e) {
	for (let t of e) try {
		let e = await fetch(t, { cache: "no-store" });
		if (!e.ok) continue;
		let n = await e.json(), r = Array.isArray(n) ? n : n.files;
		if (Array.isArray(r)) return r.filter(Ks).map((e) => qs(e));
	} catch {}
	return [];
}
async function Ws() {
	try {
		let e = await fetch("/local/icons/", { cache: "no-store" });
		return e.ok ? [...(await e.text()).matchAll(/href=["']([^"']+)["']/gi)].map((e) => e[1]) : [];
	} catch {
		return [];
	}
}
function Gs(e) {
	return e ? (typeof e == "object" ? e.file : e).toString().split("?")[0].split("/").pop() : "";
}
function Ks(e) {
	return Ms(Gs(e));
}
function qs(e, t = "") {
	let n = Gs(e);
	return n ? {
		file: n,
		name: typeof e == "object" && e.name || n,
		tags: Array.isArray(e?.tags) ? e.tags : [],
		source: e?.source || t
	} : null;
}
function Js(e) {
	let t = Gs(e);
	return t ? {
		file: t,
		name: t,
		tags: [],
		source: e?.toString().startsWith("orbit:") ? "orbit" : e?.toString().startsWith("local:") ? "local" : ""
	} : null;
}
function Ys(e) {
	return e.source === "orbit" ? `orbit:${e.file}` : e.source === "local" ? `local:${e.file}` : e.file;
}
function Xs(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter(Boolean).filter((e) => {
		let n = `${e.source || ""}:${e.file}`;
		return t.has(n) ? !1 : (t.add(n), !0);
	}).sort((e, t) => (e.name || e.file).localeCompare(t.name || t.file));
}
var Zs = e((() => {
	N(), U();
}));
//#endregion
//#region src/common/editor/helpers/inputs.js
function Qs(e, t) {
	return e._t ? e._t(t) : t;
}
function $s(e, t, n) {
	return T`
      <div class="field">
        <label>${Qs(this, e)}</label>

        <input
          .value=${this._config?.[t] || ""}
          placeholder=${n}
          @input=${(e) => this._handleInput(t, e)}
        />
      </div>
    `;
}
function ec(e, t) {
	return T`
      <div class="field">
        <label>${Qs(this, e)}</label>

        <input
          .value=${this._config?.[t] || ""}
          placeholder="states[entity.entity_id].attributes.percentage > 50"
          @input=${(e) => this._handleConfigUpdate(t, e.target.value)}
        />
      </div>
    `;
}
var tc = e((() => {
	N();
}));
//#endregion
//#region src/common/editor/helpers/config.js
function nc(e, t) {
	let n = {
		...e || {},
		...t
	};
	return Object.keys(n).forEach((e) => {
		n[e] === void 0 && delete n[e];
	}), n;
}
function q(e, t = {}) {
	let n = { ...t };
	return e.forEach((e) => {
		n[e] = void 0;
	}), n;
}
function J(e, t = []) {
	return q([e, ...t]);
}
function rc(e, t = []) {
	return q([e, ...t.map((t) => `${e}${t}`)]);
}
var ic = e((() => {}));
//#endregion
//#region src/common/editor/helpers/renders.js
function Y(e, t, n) {
	return e._t ? e._t(t, n) : t;
}
function ac(e, t) {
	let n = this._config?.[t] || "";
	return oc.call(this, e, t, n, (e) => this._handleConfigUpdate(t, e));
}
function oc(e, t, n, r, i = n) {
	let a = this._colorPickerKey === t, o = this._colorPickerTab || "picker", s = sc(n);
	return T`
    <div class="field">
      <label>${Y(this, e)}</label>

      <div class="color-row">
        <input
          .value=${n}
          placeholder="green / blue / light / #hex / rgb()"
          @input=${(e) => r(e.target.value)}
        />

        <div
          class="color-preview"
          style=${this._getColorStyle(i)}
          title=${Y(this, "Choose colour")}
          @click=${(e) => {
		e.preventDefault(), e.stopPropagation(), this._colorPickerKey = a ? "" : t, this._colorPickerTab = s;
	}}
        >
        </div>

        ${a ? T`
              <div
                class="color-popover"
                @click=${(e) => e.stopPropagation()}
              >
                <div class="color-tabs">
                  <button
                    type="button"
                    class=${o === "picker" ? "active" : ""}
                    @click=${() => {
		this._colorPickerTab = "picker";
	}}
                  >
                    ${Y(this, "Picker")}
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
		this._colorPickerTab = "theme";
	}}
                  >
                    ${Y(this, "Theme")}
                  </button>
                </div>

                ${o === "theme" ? T`
                      <div class="theme-colors">
                        ${pc.map((e) => T`
                            <button
                              type="button"
                              class="theme-color-option"
                              title=${e}
                              @click=${() => {
		r(e), this._colorPickerKey = "";
	}}
                            >
                              <span
                                class="theme-color-swatch"
                                style=${this._getColorStyle(e)}
                              ></span>
                              <span>${e}</span>
                            </button>
                          `)}
                      </div>
                    ` : T`
                      <input
                        class="native-color-picker"
                        type="color"
                        .value=${this._getColorPickerValue(i)}
                        @input=${(e) => r(e.target.value)}
                        @change=${(e) => r(e.target.value)}
                      />
                    `}
              </div>
            ` : ""}
      </div>
    </div>
  `;
}
function sc(e) {
	let t = e?.toString().trim();
	return t && (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl")) ? "picker" : "theme";
}
function cc(e, t, n) {
	let r = this._config?.[t], i = typeof n == "object" ? n : { action: n || "none" }, a = r && typeof r == "object" ? uc(r, i) : i;
	return T`
    <div class="field">
      <label>${Y(this, e)}</label>

      <select
        .value=${a.action || i.action}
        @change=${(e) => this._updateConfig({ [t]: lc(e.target.value, a) })}
      >
        <option value="toggle">${Y(this, "toggle")}</option>
        <option value="more-info">${Y(this, "more-info")}</option>
        <option value="navigate">${Y(this, "navigate")}</option>
        <option value="call-service">${Y(this, "call-service")}</option>
        <option value="popup">${Y(this, "popup")}</option>
        <option value="none">${Y(this, "none")}</option>
      </select>

      ${a.action === "navigate" ? T`
            <div class="inline-field">
              <span class="inline-label">${Y(this, "path")}</span>

              <input
                .value=${a.navigation_path || ""}
                placeholder="/lovelace/home"
                @input=${(e) => this._updateConfig({ [t]: X({
		...a,
		navigation_path: e.target.value
	}) })}
              />
            </div>
          ` : ""}

      ${a.action === "call-service" ? T`

            <!-- SERVICE -->
            <div class="inline-field">
              <span class="inline-label">${Y(this, "service")}</span>

              <input
                .value=${a.service || ""}
                placeholder="button.press"
                @input=${(e) => this._updateConfig({ [t]: X({
		...a,
		service: e.target.value
	}) })}
              />
            </div>

            <!-- ENTITY ID -->
            <div class="inline-field">
              <span class="inline-label">${Y(this, "entity_id")}</span>

              <input
                .value=${a.service_data?.entity_id || ""}
                placeholder="button.hot_water_low"
                @input=${(e) => this._updateConfig({ [t]: X({
		...a,
		service_data: {
			...a.service_data || {},
			entity_id: e.target.value
		}
	}) })}
              />
            </div>

          ` : ""}

      ${a.action === "popup" ? T`
            <div class="inline-field">
              <span class="inline-label">${Y(this, "title")}</span>

              <input
                .value=${a.popup_title || ""}
                placeholder="Security"
                @input=${(e) => this._updateConfig({ [t]: X({
		...a,
		popup_title: e.target.value
	}) })}
              />
            </div>

            <div class="inline-field">
              <span class="inline-label">${Y(this, "content")}</span>

              <input
                .value=${typeof a.popup_content == "string" ? a.popup_content : a.popup_content ? JSON.stringify(a.popup_content) : ""}
                placeholder=""
                @input=${(e) => this._updateConfig({ [t]: X({
		...a,
		popup_content: e.target.value
	}) })}
              />
            </div>
          ` : ""}
    </div>
  `;
}
function lc(e, t) {
	let n = X({
		...t,
		action: e
	});
	return e === "popup" ? X({
		...n,
		popup_title: n.popup_title || Y(this, "Security"),
		popup_content: n.popup_content || {
			type: "vertical-stack",
			cards: [{
				type: "tile",
				entity: "alarm_control_panel.house_alarm",
				vertical: !0
			}]
		},
		style: n.style || "--popup-min-width: 400px;\n--popup-max-width: 500px;\n--popup-border-radius: 20px;"
	}) : n;
}
function uc(e, t) {
	return X({
		...t,
		...e,
		action: e.action || t.action || "none"
	});
}
function X(e) {
	let t = e?.action || "none", n = { action: t };
	return t === "navigate" ? (n.navigation_path = e.navigation_path || "", n) : t === "call-service" ? (n.service = e.service || "", e.service_data && (n.service_data = { ...e.service_data }), n) : t === "popup" ? (n.popup_title = e.popup_title || "", n.popup_content = e.popup_content || "", e.style && (n.style = e.style), e.card_mod && (n.card_mod = e.card_mod), n) : n;
}
function dc(e, t) {
	return T`
    <div class="field">
      <label>${Y(this, e)}</label>

      <div class="entity-row">
        <ha-selector
          class="entity-picker"
          .hass=${this.hass}
          .selector=${{ entity: {} }}
          .value=${this._config?.[t] || ""}
          @value-changed=${(e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e.detail.value || "") : this._handleConfigUpdate(t, e.detail.value || "")}
        ></ha-selector>

        ${this._config?.[t] ? T`
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
function fc(e, t) {
	return T`
    <div class="field">
      <label>${Y(this, e)}</label>

      <ha-selector
        .hass=${this.hass}
        .selector=${{ area: {} }}
        .value=${this._config?.[t] || ""}
        @value-changed=${(e) => this._updateConfig({ [t]: e.detail.value })}
      ></ha-selector>
    </div>
  `;
}
var pc, mc = e((() => {
	N(), pc = /* @__PURE__ */ "theme.red.green.yellow.amber.blue.purple.violet.grey.orange.gold.brown.primary-color.accent-color.state-icon-color.state-light-active-color.google-red.google-green.google-yellow.google-blue.google-violet.google-grey.color-red.color-green.color-yellow.color-amber.color-blue.color-purple.color-violet.color-grey.color-darkgrey.color-pink.color-orange.color-gold.color-brown".split(".");
}));
//#endregion
//#region src/common/editor/helpers/helpers.js
function hc(e) {
	if (!e) return "background-color: rgb(var(--color-theme));";
	let t = e.toString().trim().toLowerCase();
	if (t.startsWith("#") || t.startsWith("rgb(") || t.startsWith("hsl(")) return `background-color:${t};`;
	let n = t.replace(/[^a-z0-9-_]/g, "");
	return n ? `background-color: ${tt(n)};` : "background-color: rgb(var(--color-theme));";
}
function gc(e) {
	let t = e?.toString().trim();
	return t && (bc(t) || xc(t) || _c(t)) || "#ffffff";
}
function _c(e, t = /* @__PURE__ */ new Set()) {
	let n = e?.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
	if (!n || t.has(n)) return "";
	t.add(n);
	let r = yc(n), i = n.startsWith("color-") ? "" : yc(`color-${n}`);
	return vc(r, t) || vc(i, t) || "";
}
function vc(e, t) {
	let n = e?.trim();
	if (!n) return "";
	let r = bc(n);
	if (r) return r;
	let i = xc(n);
	if (i) return i;
	let a = n.match(/^var\(\s*--([^),\s]+)\s*\)$/i);
	return a ? _c(a[1], t) : "";
}
function yc(e) {
	let t = `--${e}`, n = [document.documentElement, document.body].filter(Boolean);
	for (let e of n) {
		let n = getComputedStyle(e).getPropertyValue(t).trim();
		if (n) return n;
	}
	return "";
}
function bc(e) {
	return /^#[0-9a-f]{6}$/i.test(e) ? e : /^#[0-9a-f]{3}$/i.test(e) ? `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}` : "";
}
function xc(e) {
	let t = e.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
	if (t) return Sc(Number(t[1]), Number(t[2]), Number(t[3]));
	let n = e.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/i);
	return n ? Sc(Number(n[1]), Number(n[2]), Number(n[3])) : "";
}
function Sc(e, t, n) {
	return `#${Cc(e)}${Cc(t)}${Cc(n)}`;
}
function Cc(e) {
	return Math.max(0, Math.min(255, e || 0)).toString(16).padStart(2, "0");
}
var wc = e((() => {
	N(), Zs(), xt(), rt(), tc(), ic(), mc();
}));
//#endregion
//#region src/editors/room/sections/room.js
function Tc() {
	return T`
    <div class="section">
      ${this._renderInput("Room Name", "room_name")}

      <div class="field">
        <label>${this._t("Room Navigation Path")}</label>

        <input
          .value=${this._config?.navigate?.navigation_path || ""}
          placeholder="/lovelace/home"
          @input=${(e) => {
		this._updateConfig({ navigate: { navigation_path: e.target.value } });
	}}
        />
      </div>

      ${this._renderArea("Area", "area")}
      ${this._renderColor("Accent Color", "accent_color")}
      ${this._renderColor("Status Color", "status_color")}

      ${this._renderEntity("Main Entity", "main_entity")}
      ${this._renderIconInput("Main Entity Icon", "main_entity_icon")}

      ${this._renderIconInput("Main Entity ON Icon", "main_entity_icon_on")}

      ${this._renderIconInput("Main Entity OFF Icon", "main_entity_icon_off")}

      ${this._config?.main_entity ? T`
            ${this._renderActionSelector("Main Entity Action", "main_entity_tap_action", "more-info")}
            ${this._renderActionSelector("Hold Action", "main_entity_hold_action", "none")}
          ` : ""}
    </div>
  `;
}
var Ec = e((() => {
	N();
}));
//#endregion
//#region src/editors/room/sections/buttons.js
function Dc() {
	let e = this._selectedButtonIndex || 1;
	return T`
    <div class="section">
      ${Oc.call(this, [
		1,
		2,
		3,
		4
	], e, (e) => {
		this._selectedButtonIndex = e;
	})}

      ${kc.call(this, e)}
    </div>
  `;
}
function Oc(e, t, n) {
	return T`
    <div
      class="editor-segment-menu"
      style="--editor-segment-columns: 4;"
    >
      ${e.map((e) => T`
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
function kc(e) {
	let t = `button${e}`;
	return T`
    <div class="sub-section selected-button-section">
      ${this._renderEntity("Entity", t)}

      ${this._renderColor("ON Color", `${t}_on_color`)}
      ${this._renderColor("OFF Color", `${t}_off_color`)}

      ${this._renderIconInput("Icon", `${t}_icon`)}
      ${this._renderIconInput("ON Icon", `${t}_icon_on`)}
      ${this._renderIconInput("OFF Icon", `${t}_icon_off`)}

      ${this._renderTemplateInput("State Template", `${t}_state_template`)}

      ${this._renderActionSelector("Tap Action", `${t}_tap_action`, "toggle")}

      ${this._renderActionSelector("Hold Action", `${t}_hold_action`, "more-info")}
    </div>
  `;
}
var Ac = e((() => {
	N();
}));
//#endregion
//#region src/editors/room/sections/curve-buttons.js
function jc() {
	let e = this._selectedCurveButtonIndex || 1;
	return T`
    <div class="section">
      <div class="field">
        <label>${this._t("Lock Curve Button Positions")}</label>

        <select
          .value=${this._config?.curve_buttons_lock_position ? "true" : "false"}
          @change=${(e) => this._updateConfig({ curve_buttons_lock_position: e.target.value === "true" })}
        >
          <option value="false">${this._t("Disabled")}</option>
          <option value="true">${this._t("Enabled")}</option>
        </select>
      </div>

      <div class="curve-divider"></div>

      ${Nc.call(this, [
		1,
		2,
		3,
		4,
		5,
		6
	], e, (e) => {
		this._selectedCurveButtonIndex = e;
	})}

      ${Pc.call(this, `curve_button${e}`, "", "more-info", { index: e })}
    </div>
  `;
}
function Mc() {
	let e = It(this._config?.action_button);
	return T`
    <div class="section">
      ${Fc.call(this)}

      ${Pc.call(this, "action_button", "", e, {}, {
		showColors: !0,
		filteredEntity: !0
	})}
    </div>
  `;
}
function Nc(e, t, n) {
	return T`
    <div class="editor-segment-menu">
      ${e.map((e) => T`
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
function Pc(e, t, n, r = {}, i = {}) {
	return T`
    <div class="sub-section selected-button-section">
      ${t ? T`
            <div class="sub-section-title">
              ${this._t(t, r)}
            </div>
          ` : ""}

      ${i.filteredEntity ? Ic.call(this, "Entity", e) : this._renderEntity("Entity", e)}

      ${i.showColors ? T`
            ${Lc.call(this, "ON Color", `${e}_on_color`)}
            ${Lc.call(this, "OFF Color", `${e}_off_color`)}
          ` : ""}

      ${this._renderIconInput("Icon", `${e}_icon`)}
      ${this._renderIconInput("ON Icon", `${e}_icon_on`)}
      ${this._renderIconInput("OFF Icon", `${e}_icon_off`)}

      ${this._renderTemplateInput("State Template", `${e}_state_template`)}

      ${this._renderActionSelector("Tap Action", `${e}_tap_action`, n)}

      ${this._renderActionSelector("Hold Action", `${e}_hold_action`, "none")}
    </div>
  `;
}
function Fc() {
	let e = this._roomActionButtonDomainFilter || "all";
	return T`
    <div class="action-domain-filters">
      ${Rc.map((t) => T`
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
function Ic(e, t) {
	let n = this._roomActionButtonDomainFilter || "all", r = Rc.find((e) => e.value === n) || Rc[0], i = r.domains ? { entity: { domain: r.domains } } : { entity: {} };
	return T`
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

        ${this._config?.[t] ? T`
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
function Lc(e, t) {
	let n = this._config?.[t] || "", r = n === "theme" ? "" : n, i = r || this._config?.accent_color || "theme";
	return this._renderColorControl(e, t, r, (e) => this._handleConfigUpdate(t, e), i);
}
var Rc, zc = e((() => {
	N(), zt(), Rc = [
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
})), Bc, Vc = e((() => {
	N(), Bc = c`
:host {
  display: block;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px;
}
`;
})), Hc, Uc = e((() => {
	N(), Hc = c`
.section {
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 14px;

  border-radius: 14px;

  background: var(--secondary-background-color);
}

.sub-section {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding-bottom: 12px;
  margin-bottom: 12px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.sub-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.curve-divider {
  height: 1px;

  margin: 4px 0 6px 0;

  background: rgba(255, 255, 255, 0.08);
}
`;
})), Wc, Gc = e((() => {
	N(), Wc = c`
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  user-select: none;

  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;

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

  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;

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
})), Kc, qc = e((() => {
	N(), Kc = c`
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 12px;
  opacity: 0.7;
}

input,
select {
  width: 100%;

  padding: 10px 12px;

  border: none;
  border-radius: 10px;

  background: var(--card-background-color);
  color: inherit;

  outline: none;
  box-sizing: border-box;
}

.editor-note {
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  font-size: 12px;
  line-height: 1.4;
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
})), Jc, Yc = e((() => {
	N(), Jc = c`
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

  border: none;
  border-radius: 10px;

  background: var(--card-background-color);
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
  background: rgba(255, 255, 255, 0.14);
}
`;
})), Xc, Zc = e((() => {
	N(), Xc = c`
.color-row {
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
}

.color-row > input {
  flex: 1;
}

.color-preview {
  position: relative;
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
  overflow: hidden;
}

.color-popover {
  position: absolute;
  z-index: 20;
  top: calc(100% + 8px);
  right: 0;
  width: min(280px, 100%);
  padding: 10px;
  border-radius: 12px;
  background: var(--card-background-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.color-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  margin-bottom: 10px;
}

.color-tabs button,
.theme-color-option {
  border: 0;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  cursor: pointer;
}

.color-tabs button {
  position: relative;
  padding: 7px 8px;
  font-size: 12px;
  overflow: hidden;
}

.color-tabs button.active {
  background: rgba(130, 177, 255, 0.22);
  color: #82b1ff;
}

.native-color-picker {
  display: block;
  width: 100%;
  height: 44px;
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

.theme-colors {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  max-height: 230px;
  overflow: auto;
}

.theme-color-option {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  padding: 7px;
  font-size: 11px;
  text-align: left;
}

.theme-color-option span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.theme-color-swatch {
  flex: none;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);
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
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 10px;
  background: #000;
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
  color: white;
  display: flex;
  background: #000;
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
  border-radius: 12px;
  background: var(--card-background-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.icon-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  margin-bottom: 10px;
}

.icon-tabs button {
  border: 0;
  border-radius: 9px;
  padding: 7px 8px;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  cursor: pointer;
  font-size: 12px;
}

.icon-tabs button.active {
  background: rgba(130, 177, 255, 0.22);
  color: #82b1ff;
}

.file-icon-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}

.file-icon-section + .file-icon-section {
  margin-top: 10px;
}

.file-icon-section-title {
  margin: 0 0 6px;
  font-size: 11px;
  font-weight: 700;
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
  gap: 8px;
  min-width: 0;
  padding: 7px;
  border: 0;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  cursor: pointer;
  text-align: left;
}

.file-icon-option.active {
  background: rgba(130, 177, 255, 0.22);
}

.file-icon-preview {
  flex: none;
  width: 24px;
  height: 24px;
  color: currentColor;
}

.file-icon-preview svg,
.file-icon-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.file-icon-preview img {
  filter: brightness(0) invert(1);
}

.file-icon-option span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-picker-note {
  padding: 10px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.06);
  font-size: 12px;
  line-height: 1.4;
  opacity: 0.76;
}

.icon-picker-note code {
  display: block;
  margin-top: 5px;
  overflow-wrap: anywhere;
}
`;
})), Qc, $c = e((() => {
	N(), Qc = c`
.inline-field {
  display: flex;
  align-items: center;
  gap: 10px;
}

.inline-label {
  width: 80px;
  min-width: 80px;

  font-size: 12px;
  opacity: 0.7;

  text-transform: lowercase;
}

.inline-field input {
  flex: 1;
}
`;
})), el, tl = e((() => {
	N(), el = c`
.editor-version {
  padding: 0 14px;
  font-size: 11px;
  opacity: 0.5;
  text-align: right;
}
`;
})), nl, rl = e((() => {
	N(), nl = c`
.editor-tabs {
  display: flex;
  align-items: end;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  overflow-x: auto;
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
  font-weight: 700;
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
  gap: 8px;
  padding: 8px;
  border-radius: 14px;
  background: var(--card-background-color);
}

.editor-segment-item {
  min-width: 0;
  height: 44px;
  padding: 0 10px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
  opacity: 0.58;
  cursor: pointer;
}

.editor-segment-item.active {
  background: rgba(0, 0, 0, 0.22);
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
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
  opacity: 0.62;
}
`;
})), il, al = e((() => {
	Vc(), Uc(), Gc(), qc(), Yc(), Zc(), $c(), tl(), rl(), il = [
		Bc,
		Hc,
		Wc,
		Kc,
		Jc,
		Xc,
		Qc,
		el,
		nl
	];
})), ol, sl = e((() => {
	N(), ol = c`
.action-tabs {
  display: flex;
  align-items: end;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  margin-bottom: 12px;
  overflow-x: auto;
}

.action-group-options {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.action-wrap-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 1;
}

.action-wrap-toggle input {
  width: auto;
  margin: 0;
}

.action-tab,
.action-tab-add {
  border: none;
  background: transparent;
  color: inherit;
  min-width: 44px;
  height: 42px;
  padding: 0 12px;
  font: inherit;
  font-weight: 700;
  opacity: 0.6;
  cursor: pointer;
}

.action-tab.active {
  color: var(--primary-color);
  opacity: 1;
  border-bottom: 3px solid var(--primary-color);
}

.action-tab-add {
  margin-left: auto;
  font-size: 24px;
  opacity: 0.9;
}

.action-editor-tools {
  display: flex;
  gap: 8px;
  margin-left: auto;
  justify-content: flex-end;
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
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 7px;
  padding: 0 8px;
  background: rgba(255, 255, 255, 0.04);
  color: inherit;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
}

.action-domain-filters button.active {
  border-color: var(--primary-color);
  background: color-mix(
    in srgb,
    var(--primary-color) 28%,
    transparent
  );
  color: var(--primary-color) !important;
  box-shadow: inset 0 0 0 1px var(--primary-color);
  font-weight: 700;
}

.action-tool-button {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: var(--card-background-color);
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
  --mdc-icon-size: 22px;
}
`;
})), Z, Q = e((() => {
	Z = {
		room: "0.7.0",
		status: "0.12.2",
		action: "0.5.2"
	};
})), cl = /* @__PURE__ */ t((() => {
	N(), wc(), Ec(), Ac(), zc(), al(), sl(), z(), V(), Q();
	var e = class extends M {
		static svgCache = R;
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
			_orbitIconFiles: { state: !0 },
			_orbitIconFilesLoading: { state: !0 },
			_localIconFiles: { state: !0 },
			_localIconFilesLoading: { state: !0 }
		};
		constructor() {
			super(), this._config = this._config || {}, this._activeSection = "card", this._selectedStatusIndex = 1, this._selectedButtonIndex = 1, this._selectedCurveButtonIndex = 1, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1;
		}
		_getColorStyle(e) {
			return hc(e);
		}
		_getColorPickerValue(e) {
			return gc(e);
		}
		_t(e, t) {
			return B(this.hass, e, t);
		}
		setConfig(e) {
			this._config = e || {};
		}
		_updateConfig(e) {
			this._config = c(nc(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
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
			this._updateConfig(J("main_entity", n));
		}
		_clearStatusEntity(e) {
			this._updateConfig(rc(e, r));
		}
		_clearButtonEntity(e) {
			this._updateConfig(rc(e, i));
		}
		_clearCurveButtonEntity(e) {
			this._updateConfig(rc(e, a));
		}
		_clearActionButtonEntity(e) {
			this._updateConfig(rc(e, o));
		}
		_renderInput(e, t, n = "") {
			return $s.call(this, e, t, n);
		}
		_renderTemplateInput(e, t) {
			return ec.call(this, e, t);
		}
		_handleConfigUpdate(e, t) {
			this._updateConfig({ [e]: t });
		}
		_renderColor(e, t) {
			return ac.call(this, e, t);
		}
		_renderColorControl(e, t, n, r, i = n) {
			return oc.call(this, e, t, n, r, i);
		}
		_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
			return Fs.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return Is.call(this, e);
		}
		_isImageIcon(e) {
			return Ms(e);
		}
		_resolveIconPath(e) {
			return Ns(e);
		}
		_getInlineSvg(e) {
			return I.call(this, e, { forceColor: !0 });
		}
		_renderActionSelector(e, t, n) {
			return cc.call(this, e, t, n);
		}
		_renderEntity(e, t) {
			return dc.call(this, e, t);
		}
		_renderArea(e, t) {
			return fc.call(this, e, t);
		}
		_renderRoomSection() {
			return Tc.call(this);
		}
		_renderStatusSection() {
			let e = this._selectedStatusIndex || 1;
			return T`
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
			].map((t) => T`
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
			return Dc.call(this);
		}
		_renderCurvedButtonsSection() {
			return jc.call(this);
		}
		_renderActionButtonSection() {
			return Mc.call(this);
		}
		_renderEditorTabs() {
			return T`
      <div class="editor-tabs">
        ${t.map((e) => T`
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
			return T`
      <div class="wrapper">
        ${this._renderEditorTabs()}
        ${this._renderActiveSection()}
        <div class="editor-version">
          ${this._t("Orbit Room Card v{version}", { version: Z.room })}
        </div>
      </div>
    `;
		}
		static styles = [il, ol];
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
})), ll = /* @__PURE__ */ t((() => {
	N(), Xe(), rt(), at(), ct(), xt(), Tt(), Dt(), jt(), Ft(), z(), Mo(), Bo(), Wo(), as(), js(), cl(), Q();
	var e = class extends M {
		static svgCache = R;
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
			return _o.call(this, e);
		}
		shouldUpdate(e) {
			return Ot.call(this, e, this._getRelevantEntities(), { hasTemplates: kt(this._config) });
		}
		_handleAction(e, t = null) {
			return He.call(this, e, t);
		}
		_navigate(e) {
			return We.call(this, e);
		}
		_toggleEntity(e, t, n = null) {
			return Ge.call(this, e, t, n);
		}
		_handleButtonClick(e) {
			return Ke.call(this, e);
		}
		_handleCurveButtonClick(e) {
			return qe.call(this, e);
		}
		_handleTap(e) {
			return Je.call(this, e);
		}
		_handleMainEntityTap(e) {
			return Ye.call(this, e);
		}
		_handleMainEntityPointerDown(e) {
			return this._startLongPress(e, this._config.main_entity || this._config.entity, this._config.main_entity_hold_action);
		}
		_handleButtonPointerDown(e) {
			let t = e.currentTarget;
			return this._startLongPress(e, t.dataEntity, t.dataHoldAction);
		}
		_computeFullColor(e) {
			return Ze.call(this, e);
		}
		_computeIconColor(e) {
			return Qe.call(this, e);
		}
		_computeCircleColor(e) {
			return $e.call(this, e);
		}
		_computeButtonBackground(e) {
			return et.call(this, e);
		}
		_getCardName(e = "Card") {
			return it(this._config, this.hass, e);
		}
		formatState(e) {
			return ot(e);
		}
		_getEntityActiveState(e) {
			return st(e);
		}
		_getMainIconColor(e, t) {
			return lt.call(this, e, t);
		}
		_getEntityColor(e) {
			return ut(e);
		}
		_getBinarySensorIcon(e) {
			return dt(e);
		}
		_getDefaultDomainIcon(e, t = null) {
			return ft.call(this, e, t);
		}
		_isImageIcon(e) {
			return pt(e);
		}
		_resolveIconPath(e) {
			return mt(e);
		}
		_getInlineSvg(e, t = !0) {
			return I.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e) {
			return gt(this._config, e);
		}
		get _LONG_PRESS_DELAY() {
			return 500;
		}
		_startLongPress(e, t, n) {
			return St.call(this, e, t, n);
		}
		_cancelLongPress() {
			return Ct.call(this);
		}
		_finishLongPress(e) {
			return wt.call(this, e);
		}
		_evaluateStateTemplate(e, t) {
			return Et.call(this, e, t);
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
			return zo.call(this, e);
		}
		_renderCurveButtons() {
			return rs.call(this);
		}
		render() {
			return Vo.call(this);
		}
		static styles = As;
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
		let r = Mt(n);
		if (!t.has(r)) return null;
		let i = Nt(e, n), a = {
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
function ul(e) {
	let t = e.navigate?.navigation_path;
	return typeof t == "string" && t.trim() || null;
}
function dl(e, t, n) {
	let r = $(t, "color");
	return n ? e.accent_on_color || r || "theme" : e.accent_off_color || r || "theme";
}
function fl(e, t = null, n = null) {
	if (!e) return !1;
	let r = (n ?? e.state)?.toString().trim().toLowerCase(), i = Number(r);
	if (Number.isFinite(i)) return i > 0;
	if (ml.includes(r)) return !1;
	let a = e.entity_id?.split(".")[0];
	return [
		"sensor",
		"input_text",
		"input_select",
		"select"
	].includes(a) ? !0 : typeof t == "function" ? t(e) : !0;
}
function pl(e, t) {
	let n = $(t, "navigation"), r = typeof n == "string" ? n.trim() : n?.navigation_path;
	return ul(e) || r || "/lovelace/home";
}
var ml, hl = e((() => {
	ml = [
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
function gl(e) {
	let t = e?.states;
	if (!t) return {
		zones: [],
		zoneByTrackerState: /* @__PURE__ */ new Map()
	};
	let n = vl.get(t);
	if (n) return n;
	let r = Object.values(t).filter((e) => e.entity_id?.startsWith("zone.") && !e.attributes?.passive), i = {
		zones: r,
		zoneByTrackerState: new Map(r.map((e) => [_l(e), e]))
	};
	return vl.set(t, i), i;
}
function _l(e) {
	return (e.attributes?.friendly_name || e.entity_id.replace(/^zone\./, "")).toLowerCase().replace(/\s+/g, "_");
}
var vl, yl = e((() => {
	vl = /* @__PURE__ */ new WeakMap();
}));
//#endregion
//#region src/cards/status/helpers/lifecycle.js
function bl(e) {
	if (!e.has("_config") && !e.has("hass")) return;
	if (this._config.mode === "person") {
		wl.call(this);
		return;
	}
	if (this._config.mode === "icon_only") {
		let e = xl(this._config);
		this._statusItems = e.map((e) => Sl.call(this, e, this._config)), Cl.call(this, this._statusItems[0] || {});
		return;
	}
	let t = this._config.main_entity, n = Sl.call(this, { entity: t }, this._config);
	this._statusItems = [n], Cl.call(this, n);
}
function xl(e = {}) {
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
function Sl(e, t = {}) {
	let n = e.entity || t.main_entity, r = n && this.hass ? this.hass.states[n] : null, i = {
		...t,
		...e,
		main_entity: n
	}, a = (i.mode === "icon_only" ? null : i.status_name) || $(r, "friendly_name") || n || B(this.hass, "Status"), o = i.state_template ? this._evaluateStateTemplate(i.state_template, n) : null, s = (i.label_template ? this._evaluateStateTemplate(i.label_template, n) : null) ?? ($(r, "label") || (r ? this.formatState(r) : "")), c = i.main_entity_icon, l = i.main_entity_icon_on, u = i.main_entity_icon_off, d = fl(r, (e) => this._getEntityActiveState(e), o), f = (d ? l : u) || c || $(r, "icon") || (r ? this._getDefaultDomainIcon(r.entity_id.split(".")[0], r) : "mdi:information-outline"), p = d && l ? "main_entity_icon_on" : !d && u ? "main_entity_icon_off" : c ? "main_entity_icon" : "", m = dl(i, r, d), ee = pl(i, r), te = this._computeFullColor(m), ne = this._computeFullColor(m), h = this._computeCircleColor(m), re = d ? this._computeFullColor(m) : this._computeIconColor(m);
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
function Cl(e) {
	this._cardName = e.cardName || B(this.hass, "Status"), this._statusText = e.statusText || "", this._icon = e.icon || "mdi:information-outline", this._navigationPath = e.navigationPath || "", this._nameColor = e.nameColor || this._nameColor, this._statusColor = e.statusColor || this._statusColor, this._circleColor = e.circleColor || this._circleColor, this._iconColor = e.iconColor || this._iconColor, this._iconSvgForceColor = e.svgForceColor ?? !0;
}
function wl() {
	let e = this._config.main_entity, t = this._config.tracker_entity, n = this._config.eta_entity, r = t && this.hass ? this.hass.states[t] : null, i = e && this.hass ? this.hass.states[e] : null, a = n && this.hass ? this.hass.states[n] : null;
	this._cardName = this._config.status_name || $(i, "friendly_name") || $(r, "friendly_name") || e || t || B(this.hass, "Person");
	let o = (this._config.label_template ? this._evaluateStateTemplate(this._config.label_template, t) : null) ?? (r ? El.call(this, r) : ""), s = a && r?.state !== "home" ? this.formatState(a) : "";
	this._statusText = s ? `${o} | ${s}` : o;
	let c = fl(r, (e) => this._getEntityActiveState(e), this._config.state_template ? this._evaluateStateTemplate(this._config.state_template, t) : null), l = dl(this._config, r, c);
	this._personPicture = $(i, "entity_picture") || $(r, "entity_picture") || "", this._personZoneIcon = Tl.call(this, r, i), this._personBattery1 = Dl.call(this, this._config.battery_entity_1), this._personBattery2 = Dl.call(this, this._config.battery_entity_2), this._icon = $(i, "icon") || $(r, "icon") || "mdi:account", this._navigationPath = pl(this._config, r), this._nameColor = this._computeFullColor(l), this._statusColor = this._computeFullColor(l), this._circleColor = this._computeCircleColor(l), this._iconColor = c ? this._computeFullColor(l) : this._computeIconColor(l), this._iconSvgForceColor = !0;
}
function Tl(e, t) {
	if (e?.state === "home") return "mdi:home-variant";
	let n = gl(this.hass), r = t?.entity_id;
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
function El(e) {
	let t = e?.state;
	return t ? t === "home" ? B(this.hass, "Home") : t === "not_home" ? B(this.hass, "Away") : t.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase()) : "";
}
function Dl(e) {
	let t = e && this.hass ? this.hass.states[e] : null;
	if (!t) return null;
	let n = Number(t.state), r = "green";
	return Number.isFinite(n) && (n <= 15 ? r = "red" : n <= 30 && (r = "amber")), {
		entityId: e,
		icon: t.attributes?.icon || "mdi:battery",
		color: this._computeFullColor(r)
	};
}
var Ol = e((() => {
	hl(), yl(), V();
}));
//#endregion
//#region src/cards/status/renders/status-card.js
function kl() {
	let e = this._config?.mode || "standard", t = this._statusItems || [], n = e === "icon_only" && t.length > 1, r = Math.max(t.length, 1), i = this._getStatusColumnCount(r), a = this._getStatusRowCount(r), o = Pl(this._statusText), s = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", c = s ? this._getInlineSvg(s, this._iconSvgForceColor) : "";
	return T`
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
        ${n ? Al.call(this, t) : T`
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
          ${e === "person" ? Ml.call(this) : this._isImageIcon(this._icon) ? T`
                <div
                  class="main-image-icon"
                >
                  ${c ? H(c) : T`<img src=${s} alt="" />`}
                </div>
              ` : T`
                <ha-icon
                  class="main-icon"
                  .icon=${this._icon}
                ></ha-icon>
            `}
        </div>

        ${e === "icon_only" ? T`
              <div
                class="status-badge"
                ?hidden=${!o}
              >
                ${o}
              </div>
            ` : T`
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
function Al(e) {
	return T`
    <div class="status-icon-grid">
      ${e.map((e, t) => jl.call(this, e, t))}
    </div>
  `;
}
function jl(e, t) {
	let n = Pl(e.statusText), r = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", i = r ? this._getInlineSvg(r, e.svgForceColor) : "";
	return T`
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
        ${this._isImageIcon(e.icon) ? T`
              <div class="main-image-icon">
                ${i ? H(i) : T`<img src=${r} alt="" />`}
              </div>
            ` : T`
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
function Ml() {
	return T`
    <div class="person-main-icon">
      ${this._personPicture ? T`
            <img
              class="person-picture"
              src=${this._personPicture}
              alt=""
            />
          ` : T`
          <ha-icon
            class="person-fallback-icon"
            .icon=${this._icon || "mdi:account"}
          ></ha-icon>
          `}

      ${Nl.call(this, "zone", this._personZoneIcon || "mdi:home-minus", this._computeFullColor("blue"))}

      ${this._personBattery1 ? Nl.call(this, "battery-1", this._personBattery1.icon, this._personBattery1.color, this._personBattery1.entityId) : ""}

      ${this._personBattery2 ? Nl.call(this, "battery-2", this._personBattery2.icon, this._personBattery2.color, this._personBattery2.entityId) : ""}
    </div>
  `;
}
function Nl(e, t, n, r = null) {
	return T`
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
function Pl(e) {
	let t = String(e || "").match(/-?\d+(?:\.\d+)?/);
	return (t ? Number(t[0]) : null) === 0 ? "" : t?.[0] || "";
}
var Fl = e((() => {
	N(), U();
})), Il, Ll = e((() => {
	N(), Il = c`
  ha-card {
    aspect-ratio: 3 / 1;
    border-radius: 15px;
  }

  ha-card.mode-icon_only {
    aspect-ratio: 0.93 / 1;
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
  }

  .status-container.mode-icon_only.grouped .status-icon-grid {
    grid-auto-rows: auto;
    height: auto;
  }

  ha-card.mode-icon_only.grouped.separate-cards .status-icon-grid {
    gap: clamp(3px, 1cqw, 6px);
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
    aspect-ratio: 0.93 / 1;
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
`;
})), Rl, zl = e((() => {
	ss(), ls(), ds(), Ll(), Rl = [
		cs,
		os,
		us,
		Il
	];
}));
//#endregion
//#region src/editors/status/sections/status.js
function Bl() {
	let e = this._config?.mode || "standard", t = e === "icon_only", n = e === "person", r = t || n ? "more-info" : "navigate", i = this._config?.tap_action?.action || r, a = t || n ? i : "more-info";
	return T`
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

    ${t ? Vl.call(this, {
		cardActionDefault: r,
		mainEntityActionDefault: a
	}) : T`
          <div class="section">
            ${n ? T`
                  ${this._renderEntity("Person Entity", "main_entity")}
                  ${this._renderEntity("Tracker Entity", "tracker_entity")}
                  ${this._renderEntity("ETA Entity", "eta_entity")}
                  ${this._renderEntity("Battery Entity 1", "battery_entity_1")}
                  ${this._renderEntity("Battery Entity 2", "battery_entity_2")}
                  ${this._renderColor("Accent ON Color", "accent_on_color")}
                  ${this._renderColor("Accent OFF Color", "accent_off_color")}
                ` : T`
                  ${this._renderInput("Status Name", "status_name")}
                  ${this._renderEntity("Main Entity", "main_entity")}
                  ${this._renderColor("Accent ON Color", "accent_on_color")}
                  ${this._renderColor("Accent OFF Color", "accent_off_color")}
                  ${this._renderIconInput("Main Entity Icon", "main_entity_icon")}
                  ${this._renderIconInput("Main Entity ON Icon", "main_entity_icon_on")}
                  ${this._renderIconInput("Main Entity OFF Icon", "main_entity_icon_off")}
                  ${this._renderInput("State Template", "state_template")}
                  ${this._renderInput("Label Template", "label_template")}
                `}

            ${this._config?.main_entity ? T`
                  ${this._renderActionSelector("Card Action", "tap_action", r)}
                  ${this._renderActionSelector("Main Entity Action", "main_entity_tap_action", a)}
                  ${this._renderActionSelector("Hold Action", "main_entity_hold_action", "none")}
                ` : ""}
          </div>
        `}
  `;
}
function Vl({ cardActionDefault: e, mainEntityActionDefault: t }) {
	let n = this._getStatusItems(), r = Math.min(this._selectedStatusIndex || 0, n.length - 1), i = n[r] || {};
	return T`
    <div class="section">
      <div class="status-group-options">
        <label class="status-wrap-toggle">
          <input
            type="checkbox"
            .checked=${!!this._config?.wrap}
            @change=${(e) => this._updateConfig({
		wrap: e.target.checked,
		items_per_row: e.target.checked ? this._config?.items_per_row || 3 : this._config?.items_per_row
	})}
          />
          <span>${this._t("Wrap")}</span>
        </label>

        ${n.length > 1 ? T`
              <label class="status-wrap-toggle">
                <input
                  type="checkbox"
                  .checked=${!!this._config?.separate_cards}
                  @change=${(e) => this._updateConfig({ separate_cards: e.target.checked })}
                />
                <span>${this._t("Separate Cards")}</span>
              </label>

              <div class="status-editor-tools">
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

                <button
                  type="button"
                  class="status-tool-button"
                  title=${this._t("Remove")}
                  @click=${() => this._removeStatusItem(r)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>
              </div>
            ` : ""}
      </div>

      ${this._config?.wrap ? T`
            <div class="field">
              <label>${this._t("Items Per Row")}</label>

              <input
                type="number"
                min="1"
                step="1"
                .value=${String(this._config?.items_per_row || 3)}
                @input=${(e) => this._updateConfig({ items_per_row: Math.max(1, Number(e.target.value) || 1) })}
              />
            </div>
          ` : ""}

      <div class="status-tabs">
        ${n.map((e, t) => T`
          <button
            type="button"
            class="status-tab ${t === r ? "active" : ""}"
            @click=${() => this._selectStatusItem(t)}
          >
            ${t + 1}
          </button>
        `)}

        <button
          type="button"
          class="status-tab-add"
          @click=${() => this._addStatusItem()}
        >
          +
        </button>
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

          ${i.entity ? T`
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

      ${Ul.call(this, "Accent ON Color", "accent_on_color", r, i)}
      ${Ul.call(this, "Accent OFF Color", "accent_off_color", r, i)}

      ${this._renderStatusItemIconInput("Main Entity Icon", "main_entity_icon", r)}
      ${this._renderStatusItemIconInput("Main Entity ON Icon", "main_entity_icon_on", r)}
      ${this._renderStatusItemIconInput("Main Entity OFF Icon", "main_entity_icon_off", r)}

      ${Hl.call(this, "State Template", "state_template", r, i)}
      ${Hl.call(this, "Label Template", "label_template", r, i)}

      ${i.entity ? T`
            ${this._renderStatusItemActionSelector("Card Action", "tap_action", r, e)}
            ${this._renderStatusItemActionSelector("Main Entity Action", "main_entity_tap_action", r, t)}
            ${this._renderStatusItemActionSelector("Hold Action", "main_entity_hold_action", r, "none")}
          ` : ""}
    </div>
  `;
}
function Hl(e, t, n, r) {
	return T`
    <div class="field">
      <label>${this._t(e)}</label>
      <input
        .value=${r[t] || ""}
        @input=${(e) => this._updateStatusItem(n, { [t]: e.target.value })}
      />
    </div>
  `;
}
function Ul(e, t, n, r) {
	return this._renderColorControl(e, `status-${n}-${t}`, r[t] || "", (e) => this._updateStatusItem(n, { [t]: e }));
}
var Wl = e((() => {
	N();
})), Gl, Kl = e((() => {
	N(), Gl = c`
.status-wrap-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 1;
}

.status-wrap-toggle input {
  width: auto;
  margin: 0;
}

.status-group-options {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.status-tabs {
  display: flex;
  align-items: end;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  margin-bottom: 12px;
  overflow-x: auto;
}

.status-tab,
.status-tab-add {
  border: none;
  background: transparent;
  color: inherit;
  min-width: 44px;
  height: 42px;
  padding: 0 12px;
  font: inherit;
  font-weight: 700;
  opacity: 0.6;
  cursor: pointer;
}

.status-tab.active {
  color: var(--primary-color);
  opacity: 1;
  border-bottom: 3px solid var(--primary-color);
}

.status-tab-add {
  margin-left: auto;
  font-size: 24px;
  opacity: 0.9;
}

.status-editor-tools {
  display: flex;
  gap: 8px;
  margin-left: auto;
  justify-content: flex-end;
}

.status-tool-button {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: var(--card-background-color);
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
  --mdc-icon-size: 22px;
}
`;
})), ql = /* @__PURE__ */ t((() => {
	N(), wc(), Wl(), al(), Kl(), z(), V(), Q();
	var e = class extends M {
		static svgCache = R;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_selectedStatusIndex: { state: !0 },
			_colorPickerKey: { state: !0 },
			_colorPickerTab: { state: !0 },
			_iconPickerKey: { state: !0 },
			_iconPickerTab: { state: !0 },
			_orbitIconFiles: { state: !0 },
			_orbitIconFilesLoading: { state: !0 },
			_localIconFiles: { state: !0 },
			_localIconFilesLoading: { state: !0 }
		};
		constructor() {
			super(), this._config = this._config || {}, this._selectedStatusIndex = 0, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1;
		}
		_getColorStyle(e) {
			return hc(e);
		}
		_getColorPickerValue(e) {
			return gc(e);
		}
		_t(e, t) {
			return B(this.hass, e, t);
		}
		setConfig(e) {
			this._config = e || {}, this._selectedStatusIndex = Math.min(this._selectedStatusIndex || 0, this._getStatusItems(e).length - 1);
		}
		_updateConfig(e) {
			this._config = c(nc(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
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
				this._updateConfig(J("tracker_entity", a));
				return;
			}
			this._handleConfigUpdate(e, t);
		}
		_clearMainEntity() {
			if (this._config?.mode === "person") {
				this._updateConfig(J("main_entity", i));
				return;
			}
			this._updateConfig(J("main_entity", n));
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
			this._selectedStatusIndex = e.length, this._updateConfig(q(r, { entities: [...e, { entity: "" }] }));
		}
		_removeStatusItem(e) {
			let t = this._getStatusItems();
			if (t.length <= 1) {
				this._updateConfig(J("main_entity", n));
				return;
			}
			let r = t.filter((t, n) => n !== e);
			this._selectedStatusIndex = Math.max(0, Math.min(e, r.length - 1)), this._updateConfig({ entities: r });
		}
		_moveStatusItem(e, t) {
			let n = this._getStatusItems(), i = e + t;
			if (i < 0 || i >= n.length) return;
			let a = [...n], [o] = a.splice(e, 1);
			a.splice(i, 0, o), this._selectedStatusIndex = i, this._updateConfig(q(r, { entities: a }));
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
				t.length > 1 && Object.assign(n, q(r)), this._updateConfig(n);
				return;
			}
			if (i.entity === "") {
				this._updateConfig(J("main_entity", n));
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
			return $s.call(this, e, t, n);
		}
		_renderTemplateInput(e, t) {
			return ec.call(this, e, t);
		}
		_renderColor(e, t) {
			return ac.call(this, e, t);
		}
		_renderColorControl(e, t, n, r) {
			return oc.call(this, e, t, n, r);
		}
		_renderEntity(e, t) {
			return dc.call(this, e, t);
		}
		_renderActionSelector(e, t, n) {
			return cc.call(this, e, t, n);
		}
		_renderStatusItemActionSelector(e, t, n, r) {
			let i = {
				_config: this._getStatusItems()[n] || {},
				_t: (e, t) => this._t(e, t),
				_updateConfig: (e) => this._updateStatusItem(n, e)
			};
			return cc.call(i, e, t, r);
		}
		_renderArea(e, t) {
			return fc.call(this, e, t);
		}
		_renderIconInput(e, t, n = "mdi:information-outline or icon.svg") {
			return Fs.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return Is.call(this, e);
		}
		_renderStatusItemIconInput(e, t, n, r = "mdi:information-outline or icon.svg") {
			let i = {
				_config: this._getStatusItems()[n] || {},
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
			return Object.defineProperties(i, {
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
			}), Fs.call(i, e, t, r);
		}
		_isImageIcon(e) {
			return Ms(e);
		}
		_resolveIconPath(e) {
			return Ns(e);
		}
		_getInlineSvg(e) {
			return I.call(this, e, { forceColor: !0 });
		}
		_renderStatusSection() {
			return Bl.call(this);
		}
		render() {
			return T`
      <div class="wrapper">
        ${this._renderStatusSection()}
        <div class="editor-version">
          ${this._t("Orbit Status Card v{version}", { version: Z.status })}
        </div>
      </div>
    `;
		}
		static styles = [il, Gl];
	};
	customElements.define("orbit-status-card-editor", e);
	function t(e) {
		Object.assign(e, q(n));
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
})), Jl = /* @__PURE__ */ t((() => {
	N(), Xe(), rt(), ct(), xt(), Tt(), Dt(), jt(), Ft(), z(), V(), Ol(), Fl(), zl(), ql(), Q();
	var e = class extends M {
		static svgCache = R;
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
				let e = xl(this._config).length, t = n(this._config, e);
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
			return bl.call(this, e);
		}
		shouldUpdate(e) {
			return Ot.call(this, e, this._getRelevantEntities(), {
				hasTemplates: kt(this._config),
				includeZones: this._config?.mode === "person"
			});
		}
		_handleAction(e, t = null) {
			return He.call(this, e, t);
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
			return We.call(this, e);
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
			return Ze.call(this, e);
		}
		_computeIconColor(e) {
			return Qe.call(this, e);
		}
		_computeCircleColor(e) {
			return $e.call(this, e);
		}
		_getMainStateObj() {
			let e = this._config.main_entity;
			return e && this.hass ? this.hass.states[e] : null;
		}
		formatState(e) {
			return ot(e);
		}
		_getEntityActiveState(e) {
			return st(e);
		}
		_getBinarySensorIcon(e) {
			return dt(e);
		}
		_getDefaultDomainIcon(e, t = null) {
			return ft.call(this, e, t);
		}
		_isImageIcon(e) {
			return pt(e);
		}
		_resolveIconPath(e) {
			return mt(e);
		}
		_getInlineSvg(e, t = !0) {
			return I.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e, t) {
			return gt(e, t);
		}
		_evaluateStateTemplate(e, t) {
			return Et.call(this, e, t);
		}
		_getRelevantEntities() {
			return this._config?.mode === "icon_only" ? xl(this._config).map((e) => e.entity || e.main_entity) : [
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
			return kl.call(this);
		}
		static styles = Rl;
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
		let n = Mt(t);
		if (n === "person") return { config: {
			type: "custom:orbit-status-card",
			mode: "person",
			main_entity: t
		} };
		if (i.has(n)) return null;
		let r = {
			label: B(e, "Standard"),
			config: {
				type: "custom:orbit-status-card",
				mode: "standard",
				main_entity: t
			}
		};
		return Pt(e, t) ? [r, {
			label: B(e, "Icon Only"),
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
function Yl(e) {
	!e.has("_config") && !e.has("hass") || (this._actions = Xl(this._config).map((e) => Zl.call(this, e)));
}
function Xl(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.main_entity,
		accent_color: e.accent_color,
		main_entity_icon: e.main_entity_icon,
		main_entity_icon_svg_color_override: e.main_entity_icon_svg_color_override,
		tap_action: e.tap_action,
		hold_action: e.hold_action
	}];
}
function Zl(e) {
	let t = e.entity || e.main_entity, n = t && this.hass ? this.hass.states[t] : null, r = e.accent_color || this._config.accent_color || "theme", i = Ql(n), a = this._computeCircleColor(r), o = i ? this._computeFullColor(r) : this._computeIconColor(r), s = e.main_entity_icon ? "main_entity_icon" : e.icon ? "icon" : "", c = e.main_entity_icon || e.icon || n?.attributes?.icon || (n ? this._getDefaultDomainIcon(n.entity_id.split(".")[0], n) : "mdi:play-circle");
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
function Ql(e) {
	if (!e) return !1;
	let t = e.entity_id?.split(".")[0], n = Number(e.attributes?.current);
	return Number.isFinite(n) && n > 0 ? !0 : t === "script" && e.state === "on";
}
var $l = e((() => {}));
//#endregion
//#region src/cards/action/renders/action-card.js
function eu() {
	let e = this._actions || [], t = Math.max(e.length, 1), n = this._getActionColumnCount(t), r = this._getActionRowCount(t);
	return T`
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
        ${e.map((e, t) => tu.call(this, e, t))}
      </div>
    </ha-card>
  `;
}
function tu(e, t) {
	let n = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", r = n ? this._getInlineSvg(n, e.svgForceColor) : "";
	return T`
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
        ${this._isImageIcon(e.icon) ? T`
              <div class="main-image-icon">
                ${r ? H(r) : T`<img src=${n} alt="" />`}
              </div>
            ` : T`
              <ha-icon
                class="main-icon"
                .icon=${e.icon}
              ></ha-icon>
            `}
      </div>
    </div>
  `;
}
var nu = e((() => {
	N(), U();
})), ru, iu = e((() => {
	N(), ls(), ds(), ru = [
		cs,
		us,
		c`
    ha-card {
      aspect-ratio: 0.93 / 1;
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
    }

    ha-card.grouped.separate-cards .action-container {
      gap: clamp(3px, 1cqw, 6px);
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
      aspect-ratio: 0.93 / 1;
      height: auto;
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
function au() {
	let e = this._getActionItems(), t = Math.min(this._selectedActionIndex || 0, e.length - 1), n = e[t] || {}, r = this._actionEntityDomainFilter || "all", i = ou(r);
	return T`
    <div class="section">
      <div class="action-group-options">
        <label class="action-wrap-toggle">
          <input
            type="checkbox"
            .checked=${!!this._config?.wrap}
            @change=${(e) => this._updateConfig({
		wrap: e.target.checked,
		actions_per_row: e.target.checked ? this._config?.actions_per_row || 3 : this._config?.actions_per_row
	})}
          />
          <span>${this._t("Wrap")}</span>
        </label>

        ${e.length > 1 ? T`
              <label class="action-wrap-toggle">
                <input
                  type="checkbox"
                  .checked=${!!this._config?.separate_cards}
                  @change=${(e) => this._updateConfig({ separate_cards: e.target.checked })}
                />
                <span>${this._t("Separate Cards")}</span>
              </label>

              <div class="action-editor-tools">
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

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Remove")}
                  @click=${() => this._removeActionItem(t)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>
              </div>
            ` : ""}
      </div>

      ${this._config?.wrap ? T`
            <div class="field">
              <label>${this._t("Actions Per Row")}</label>

              <input
                type="number"
                min="1"
                step="1"
                .value=${String(this._config?.actions_per_row || 3)}
                @input=${(e) => this._updateConfig({ actions_per_row: Math.max(1, Number(e.target.value) || 1) })}
              />
            </div>
          ` : ""}

      <div class="action-tabs">
        ${e.map((e, n) => T`
          <button
            type="button"
            class="action-tab ${n === t ? "active" : ""}"
            @click=${() => this._selectActionItem(n)}
          >
            ${n + 1}
          </button>
        `)}

        <button
          type="button"
          class="action-tab-add"
          @click=${() => this._addActionItem()}
        >
          +
        </button>
      </div>

      <div class="field">
        <label>${this._t("Main Entity")}</label>

        <div class="action-domain-filters">
          ${cu.map((e) => T`
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

          ${n.entity ? T`
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

      ${n.entity ? T`
            ${this._renderActionItemActionSelector("Tap Action", "tap_action", t, su(n.entity))}
            ${this._renderActionItemActionSelector("Hold Action", "hold_action", t, "more-info")}
          ` : ""}
    </div>
  `;
}
function ou(e) {
	return (cu.find((t) => t.value === e) || cu[0]).domains;
}
function su(e) {
	let t = e?.split(".")[0];
	return t === "scene" ? {
		action: "call-service",
		service: "scene.turn_on",
		service_data: { entity_id: e }
	} : t === "script" ? {
		action: "call-service",
		service: "script.turn_on",
		service_data: { entity_id: e }
	} : t === "automation" ? {
		action: "call-service",
		service: "automation.trigger",
		service_data: { entity_id: e }
	} : t === "button" || t === "input_button" ? {
		action: "call-service",
		service: "button.press",
		service_data: { entity_id: e }
	} : { action: "toggle" };
}
var cu, lu = e((() => {
	N(), cu = [
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
})), uu = /* @__PURE__ */ t((() => {
	N(), wc(), lu(), al(), sl(), z(), V(), Q();
	var e = class extends M {
		static svgCache = R;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_selectedActionIndex: { state: !0 },
			_actionEntityDomainFilter: { state: !0 },
			_colorPickerKey: { state: !0 },
			_colorPickerTab: { state: !0 },
			_iconPickerKey: { state: !0 },
			_iconPickerTab: { state: !0 },
			_orbitIconFiles: { state: !0 },
			_orbitIconFilesLoading: { state: !0 },
			_localIconFiles: { state: !0 },
			_localIconFilesLoading: { state: !0 }
		};
		constructor() {
			super(), this._config = this._config || {}, this._selectedActionIndex = 0, this._actionEntityDomainFilter = "all", this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1;
		}
		setConfig(e) {
			this._config = e || {}, this._selectedActionIndex = Math.min(this._selectedActionIndex || 0, this._getActionItems(e).length - 1);
		}
		_t(e, t) {
			return B(this.hass, e, t);
		}
		_updateConfig(e) {
			this._config = o(nc(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
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
			this._selectedActionIndex = e.length, this._updateConfig(q(r, { entities: [...e, { entity: "" }] }));
		}
		_removeActionItem(e) {
			let t = this._getActionItems();
			if (t.length <= 1) {
				this._updateConfig(J("main_entity", n));
				return;
			}
			let r = t.filter((t, n) => n !== e);
			this._selectedActionIndex = Math.max(0, Math.min(e, r.length - 1)), this._updateConfig({ entities: r });
		}
		_moveActionItem(e, t) {
			let n = this._getActionItems(), i = e + t;
			if (i < 0 || i >= n.length) return;
			let a = [...n], [o] = a.splice(e, 1);
			a.splice(i, 0, o), this._selectedActionIndex = i, this._updateConfig(q(r, { entities: a }));
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
				t.length > 1 && Object.assign(n, q(r)), this._updateConfig(n);
				return;
			}
			if (i.entity === "") {
				this._updateConfig(J("main_entity", n));
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
			return hc(e);
		}
		_getColorPickerValue(e) {
			return gc(e);
		}
		_renderActionSelector(e, t, n) {
			return cc.call(this, e, t, n);
		}
		_renderActionItemActionSelector(e, t, n, r) {
			let i = {
				_config: this._getActionItems()[n] || {},
				_t: (e, t) => this._t(e, t),
				_updateConfig: (e) => this._updateActionItem(n, e)
			};
			return cc.call(i, e, t, r);
		}
		_renderColor(e, t) {
			return ac.call(this, e, t);
		}
		_renderColorControl(e, t, n, r) {
			return oc.call(this, e, t, n, r);
		}
		_renderEntity(e, t) {
			return dc.call(this, e, t);
		}
		_renderIconInput(e, t, n = "mdi:palette or icon.svg") {
			return Fs.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return Is.call(this, e);
		}
		_renderActionItemIconInput(e, t, n, r = "mdi:palette or icon.svg") {
			let i = {
				_config: this._getActionItems()[n] || {},
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
			return Object.defineProperties(i, {
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
			}), Fs.call(i, e, t, r);
		}
		_isImageIcon(e) {
			return Ms(e);
		}
		_resolveIconPath(e) {
			return Ns(e);
		}
		_getInlineSvg(e) {
			return I.call(this, e, { forceColor: !0 });
		}
		_renderActionSection() {
			return au.call(this);
		}
		render() {
			return T`
      <div class="wrapper">
        ${this._renderActionSection()}
        <div class="editor-version">
          ${this._t("Orbit Action Card v{version}", { version: Z.action })}
        </div>
      </div>
    `;
		}
		static styles = [il, ol];
	};
	customElements.define("orbit-action-card-editor", e);
	function t(e) {
		Object.assign(e, q(n));
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
})), du = /* @__PURE__ */ t((() => {
	N(), Xe(), rt(), xt(), jt(), Ft(), z(), $l(), nu(), iu(), uu(), Q();
	var e = class extends M {
		static svgCache = R;
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
			let e = Xl(this._config).length, n = t(this._config, e);
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
			return Yl.call(this, e);
		}
		shouldUpdate(e) {
			return Ot.call(this, e, Xl(this._config).map((e) => e.entity || e.main_entity), { hasTemplates: kt(this._config) });
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
			return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : n(this._getActionEntityId(e));
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
			return He.call(this, e, t);
		}
		_computeFullColor(e) {
			return Ze.call(this, e);
		}
		_computeIconColor(e) {
			return Qe.call(this, e);
		}
		_computeCircleColor(e) {
			return $e.call(this, e);
		}
		_getDefaultDomainIcon(e, t = null) {
			return ft.call(this, e, t);
		}
		_isImageIcon(e) {
			return pt(e);
		}
		_resolveIconPath(e) {
			return mt(e);
		}
		_getInlineSvg(e, t = !0) {
			return I.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e, t) {
			return gt(e, t);
		}
		_clearHoldTimer() {
			this._holdTimer &&= (clearTimeout(this._holdTimer), null);
		}
		_stopEvent(e) {
			e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
		}
		render() {
			return eu.call(this);
		}
		static styles = ru;
	};
	function t(e = {}, t = 1) {
		if (!e.wrap) return Math.max(1, t);
		let n = Number(e.actions_per_row);
		return Math.max(1, Math.min(t, (Number.isFinite(n) ? Math.floor(n) : 3) || 1));
	}
	function n(e) {
		let t = e?.split(".")[0];
		return t === "scene" ? {
			action: "call-service",
			service: "scene.turn_on",
			service_data: { entity_id: e }
		} : t === "script" ? {
			action: "call-service",
			service: "script.turn_on",
			service_data: { entity_id: e }
		} : t === "automation" ? {
			action: "call-service",
			service: "automation.trigger",
			service_data: { entity_id: e }
		} : t === "button" || t === "input_button" ? {
			action: "call-service",
			service: "button.press",
			service_data: { entity_id: e }
		} : { action: "toggle" };
	}
	customElements.define("orbit-action-card", e), window.customCards = window.customCards || [], window.customCards.push({
		type: "orbit-action-card",
		name: "Orbit Action Card",
		description: "Compact scene, script, and automation launcher",
		preview: !0,
		version: Z.action,
		getEntitySuggestion: i
	}), console.info(`%c Orbit Action Card %c v${Z.action} `, "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;", "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;");
	var r = new Set([
		"automation",
		"button",
		"input_button",
		"scene",
		"script"
	]);
	function i(e, t) {
		return r.has(Mt(t)) ? { config: {
			type: "custom:orbit-action-card",
			main_entity: t
		} } : null;
	}
})), fu = /* @__PURE__ */ t((() => {
	ll(), Jl(), du();
}));
//#endregion
export default fu();
