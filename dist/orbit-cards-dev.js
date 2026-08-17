console.info("Orbit Cards development namespace active (-dev)");
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
})), f, p, m, h, g, ee, _, v, te, ne, re, ie, y, ae, b, oe = e((() => {
	d(), {is: f, defineProperty: p, getOwnPropertyDescriptor: m, getOwnPropertyNames: h, getOwnPropertySymbols: g, getPrototypeOf: ee} = Object, _ = globalThis, v = _.trustedTypes, te = v ? v.emptyScript : "", ne = _.reactiveElementPolyfillSupport, re = (e, t) => e, ie = {
		toAttribute(e, t) {
			switch (t) {
				case Boolean:
					e = e ? te : null;
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
	}, y = (e, t) => !f(e, t), ae = {
		attribute: !0,
		type: String,
		converter: ie,
		reflect: !1,
		useDefault: !1,
		hasChanged: y
	}, Symbol.metadata ??= Symbol("metadata"), _.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap(), b = class extends HTMLElement {
		static addInitializer(e) {
			this._$Ei(), (this.l ??= []).push(e);
		}
		static get observedAttributes() {
			return this.finalize(), this._$Eh && [...this._$Eh.keys()];
		}
		static createProperty(e, t = ae) {
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
			return this.elementProperties.get(e) ?? ae;
		}
		static _$Ei() {
			if (this.hasOwnProperty(re("elementProperties"))) return;
			let e = ee(this);
			e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
		}
		static finalize() {
			if (this.hasOwnProperty(re("finalized"))) return;
			if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(re("properties"))) {
				let e = this.properties, t = [...h(e), ...g(e)];
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
				let i = (n.converter?.toAttribute === void 0 ? ie : n.converter).toAttribute(t, n.type);
				this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
			}
		}
		_$AK(e, t) {
			let n = this.constructor, r = n._$Eh.get(e);
			if (r !== void 0 && this._$Em !== r) {
				let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? ie : e.converter;
				this._$Em = r;
				let a = i.fromAttribute(t, e.type);
				this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
			}
		}
		requestUpdate(e, t, n, r = !1, i) {
			if (e !== void 0) {
				let a = this.constructor;
				if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? y)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
	}, b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[re("elementProperties")] = /* @__PURE__ */ new Map(), b[re("finalized")] = /* @__PURE__ */ new Map(), ne?.({ ReactiveElement: b }), (_.reactiveElementVersions ??= []).push("2.1.2");
}));
//#endregion
//#region node_modules/lit-html/lit-html.js
function se(e, t) {
	if (!he(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ue === void 0 ? t : ue.createHTML(t);
}
function x(e, t, n = e, r) {
	if (t === O) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = me(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = x(e, i._$AS(e, t.values), i, r)), t;
}
var ce, le, S, ue, C, w, de, fe, T, pe, me, he, ge, _e, ve, ye, be, E, xe, Se, Ce, we, D, O, k, Te, A, Ee, De, Oe, ke, Ae, je, Me, Ne, Pe, Fe, Ie, Le, Re = e((() => {
	ce = globalThis, le = (e) => e, S = ce.trustedTypes, ue = S ? S.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, C = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, de = "?" + w, fe = `<${de}>`, T = document, pe = () => T.createComment(""), me = (e) => e === null || typeof e != "object" && typeof e != "function", he = Array.isArray, ge = (e) => he(e) || typeof e?.[Symbol.iterator] == "function", _e = "[ 	\n\f\r]", ve = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ye = /-->/g, be = />/g, E = RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), xe = /'/g, Se = /"/g, Ce = /^(?:script|style|textarea|title)$/i, we = (e) => (t, ...n) => ({
		_$litType$: e,
		strings: t,
		values: n
	}), D = we(1), we(2), we(3), O = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), Te = /* @__PURE__ */ new WeakMap(), A = T.createTreeWalker(T, 129), Ee = (e, t) => {
		let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ve;
		for (let t = 0; t < n; t++) {
			let n = e[t], s, c, l = -1, u = 0;
			for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ve ? c[1] === "!--" ? o = ye : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = E) : (Ce.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = E) : o = be : o === E ? c[0] === ">" ? (o = i ?? ve, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? E : c[3] === "\"" ? Se : xe) : o === Se || o === xe ? o = E : o === ye || o === be ? o = ve : (o = E, i = void 0);
			let d = o === E && e[t + 1].startsWith("/>") ? " " : "";
			a += o === ve ? n + fe : l >= 0 ? (r.push(s), n.slice(0, l) + C + n.slice(l) + w + d) : n + w + (l === -2 ? t : d);
		}
		return [se(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
	}, De = class e {
		constructor({ strings: t, _$litType$: n }, r) {
			let i;
			this.parts = [];
			let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Ee(t, n);
			if (this.el = e.createElement(l, r), A.currentNode = this.el.content, n === 2 || n === 3) {
				let e = this.el.content.firstChild;
				e.replaceWith(...e.childNodes);
			}
			for (; (i = A.nextNode()) !== null && c.length < s;) {
				if (i.nodeType === 1) {
					if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(C)) {
						let t = u[o++], n = i.getAttribute(e).split(w), r = /([.?@])?(.*)/.exec(t);
						c.push({
							type: 1,
							index: a,
							name: r[2],
							strings: n,
							ctor: r[1] === "." ? je : r[1] === "?" ? Me : r[1] === "@" ? Ne : Ae
						}), i.removeAttribute(e);
					} else e.startsWith(w) && (c.push({
						type: 6,
						index: a
					}), i.removeAttribute(e));
					if (Ce.test(i.tagName)) {
						let e = i.textContent.split(w), t = e.length - 1;
						if (t > 0) {
							i.textContent = S ? S.emptyScript : "";
							for (let n = 0; n < t; n++) i.append(e[n], pe()), A.nextNode(), c.push({
								type: 2,
								index: ++a
							});
							i.append(e[t], pe());
						}
					}
				} else if (i.nodeType === 8) if (i.data === de) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(w, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += w.length - 1;
				}
				a++;
			}
		}
		static createElement(e, t) {
			let n = T.createElement("template");
			return n.innerHTML = e, n;
		}
	}, Oe = class {
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
			let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? T).importNode(t, !0);
			A.currentNode = r;
			let i = A.nextNode(), a = 0, o = 0, s = n[0];
			for (; s !== void 0;) {
				if (a === s.index) {
					let t;
					s.type === 2 ? t = new ke(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Pe(i, this, e)), this._$AV.push(t), s = n[++o];
				}
				a !== s?.index && (i = A.nextNode(), a++);
			}
			return A.currentNode = T, r;
		}
		p(e) {
			let t = 0;
			for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
		}
	}, ke = class e {
		get _$AU() {
			return this._$AM?._$AU ?? this._$Cv;
		}
		constructor(e, t, n, r) {
			this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
			e = x(this, e, t), me(e) ? e === k || e == null || e === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : e !== this._$AH && e !== O && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ge(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
		}
		O(e) {
			return this._$AA.parentNode.insertBefore(e, this._$AB);
		}
		T(e) {
			this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
		}
		_(e) {
			this._$AH !== k && me(this._$AH) ? this._$AA.nextSibling.data = e : this.T(T.createTextNode(e)), this._$AH = e;
		}
		$(e) {
			let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = De.createElement(se(n.h, n.h[0]), this.options)), n);
			if (this._$AH?._$AD === r) this._$AH.p(t);
			else {
				let e = new Oe(r, this), n = e.u(this.options);
				e.p(t), this.T(n), this._$AH = e;
			}
		}
		_$AC(e) {
			let t = Te.get(e.strings);
			return t === void 0 && Te.set(e.strings, t = new De(e)), t;
		}
		k(t) {
			he(this._$AH) || (this._$AH = [], this._$AR());
			let n = this._$AH, r, i = 0;
			for (let a of t) i === n.length ? n.push(r = new e(this.O(pe()), this.O(pe()), this, this.options)) : r = n[i], r._$AI(a), i++;
			i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
		}
		_$AR(e = this._$AA.nextSibling, t) {
			for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
				let t = le(e).nextSibling;
				le(e).remove(), e = t;
			}
		}
		setConnected(e) {
			this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
		}
	}, Ae = class {
		get tagName() {
			return this.element.tagName;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		constructor(e, t, n, r, i) {
			this.type = 1, this._$AH = k, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = k;
		}
		_$AI(e, t = this, n, r) {
			let i = this.strings, a = !1;
			if (i === void 0) e = x(this, e, t, 0), a = !me(e) || e !== this._$AH && e !== O, a && (this._$AH = e);
			else {
				let r = e, o, s;
				for (e = i[0], o = 0; o < i.length - 1; o++) s = x(this, r[n + o], t, o), s === O && (s = this._$AH[o]), a ||= !me(s) || s !== this._$AH[o], s === k ? e = k : e !== k && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
			}
			a && !r && this.j(e);
		}
		j(e) {
			e === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
		}
	}, je = class extends Ae {
		constructor() {
			super(...arguments), this.type = 3;
		}
		j(e) {
			this.element[this.name] = e === k ? void 0 : e;
		}
	}, Me = class extends Ae {
		constructor() {
			super(...arguments), this.type = 4;
		}
		j(e) {
			this.element.toggleAttribute(this.name, !!e && e !== k);
		}
	}, Ne = class extends Ae {
		constructor(e, t, n, r, i) {
			super(e, t, n, r, i), this.type = 5;
		}
		_$AI(e, t = this) {
			if ((e = x(this, e, t, 0) ?? k) === O) return;
			let n = this._$AH, r = e === k && n !== k || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== k && (n === k || r);
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
			x(this, e);
		}
	}, Fe = {
		M: C,
		P: w,
		A: de,
		C: 1,
		L: Ee,
		R: Oe,
		D: ge,
		V: x,
		I: ke,
		H: Ae,
		N: Me,
		U: Ne,
		B: je,
		F: Pe
	}, Ie = ce.litHtmlPolyfillSupport, Ie?.(De, ke), (ce.litHtmlVersions ??= []).push("3.3.3"), Le = (e, t, n) => {
		let r = n?.renderBefore ?? t, i = r._$litPart$;
		if (i === void 0) {
			let e = n?.renderBefore ?? null;
			r._$litPart$ = i = new ke(t.insertBefore(pe(), e), e, void 0, n ?? {});
		}
		return i._$AI(e), i;
	};
})), ze, j, Be, Ve = e((() => {
	oe(), oe(), Re(), Re(), ze = globalThis, j = class extends b {
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
			return O;
		}
	}, j._$litElement$ = !0, j.finalized = !0, ze.litElementHydrateSupport?.({ LitElement: j }), Be = ze.litElementPolyfillSupport, Be?.({ LitElement: j }), (ze.litElementVersions ??= []).push("4.2.2");
})), He = e((() => {})), M = e((() => {
	oe(), Re(), Ve(), He();
}));
//#endregion
//#region src/common/helpers/actions.js
function Ue(e, t = null) {
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
			let r = Ke(e, t, n);
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
function N(e) {
	return !!(e?.action && e.action !== "none");
}
function P(e) {
	let t = e;
	for (; t;) {
		let e = t.localName || "";
		if (e === "hui-card-picker" || e === "hui-dialog-add-card" || e === "hui-card-picker-card") return !0;
		let n = t.getRootNode?.();
		t = t.parentElement || (n instanceof ShadowRoot ? n.host : null);
	}
	return !1;
}
function F(e, t, n, r) {
	if (!P(this)) {
		if (Ge(e), this._clearDoubleTapTimer?.(), N(r)) {
			this._doubleTapTimer = setTimeout(() => {
				this._doubleTapTimer = null, this._handleAction(n, t);
			}, 250);
			return;
		}
		this._handleAction(n, t);
	}
}
function I(e, t, n) {
	P(this) || (Ge(e), this._clearDoubleTapTimer?.(), N(n) && this._handleAction(n, t));
}
function We() {
	this._doubleTapTimer &&= (clearTimeout(this._doubleTapTimer), null);
}
function Ge(e) {
	e?.preventDefault?.(), e?.stopPropagation?.(), e?.stopImmediatePropagation && e.stopImmediatePropagation();
}
function Ke(e, t, n) {
	let { action: r, popup_title: i, popup_content: a, popup_options: o, title: s, content: c, ...l } = e;
	return {
		...l,
		...o || {},
		title: t,
		content: n
	};
}
function qe(e) {
	e && (history.pushState(null, "", e), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } })));
}
function Je(e, t, n = null) {
	t.stopPropagation(), this._handleAction(n || { action: "toggle" }, e);
}
function Ye(e) {
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction, r = e.currentTarget.dataDoubleAction;
	F.call(this, e, t, n, r);
}
function Xe(e) {
	I.call(this, e, e.currentTarget.dataEntity, e.currentTarget.dataDoubleAction);
}
function Ze(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	let t = e.currentTarget.dataEntity, n = e.currentTarget.dataAction, r = e.currentTarget.dataDoubleAction;
	F.call(this, e, t, n, r);
}
function Qe(e) {
	I.call(this, e, e.currentTarget.dataEntity, e.currentTarget.dataDoubleAction);
}
function $e(e) {
	if (!P(this)) {
		if (this._longPressTriggered) {
			this._longPressTriggered = !1;
			return;
		}
		if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return tt.call(this, e);
		F.call(this, e, this._config.main_entity || this._config.entity, rt(this._config), this._config.double_tap_action);
	}
}
function et(e) {
	if (!P(this)) {
		if (e.composedPath().some((e) => e?.classList && e.classList.contains("circle"))) return nt.call(this, e);
		I.call(this, e, this._config.main_entity || this._config.entity, this._config.double_tap_action);
	}
}
function tt(e) {
	if (this._longPressTriggered) {
		this._longPressTriggered = !1;
		return;
	}
	let t = this._config.main_entity || this._config.entity;
	if (!t) {
		F.call(this, e, null, rt(this._config), this._config.double_tap_action);
		return;
	}
	F.call(this, e, t, it(this._config), this._config.main_entity_double_tap_action);
}
function nt(e) {
	let t = this._config.main_entity || this._config.entity;
	if (!t) {
		I.call(this, e, null, this._config.double_tap_action);
		return;
	}
	I.call(this, e, t, this._config.main_entity_double_tap_action);
}
function rt(e = {}) {
	return e.tap_action?.action ? e.tap_action : {
		action: "navigate",
		navigation_path: e.navigate?.navigation_path || e.navigation_path || "/lovelace/home"
	};
}
function it(e = {}) {
	return e.main_entity_tap_action?.action === "none" ? rt(e) : e.main_entity_tap_action || { action: "more-info" };
}
var at = e((() => {}));
//#endregion
//#region src/common/helpers/colors.js
function ot(e) {
	if (!e) return "rgb(var(--color-theme))";
	let t = e.toString().trim();
	return _t(t) ? t : ut(t);
}
function st(e) {
	if (!e) return "rgba(var(--color-theme), 0.3)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.3)" : gt(t, 70);
}
function ct(e) {
	if (!e) return "rgba(var(--color-theme), 0.2)";
	let t = e.toString().trim();
	return t === "theme" ? "rgba(var(--color-theme), 0.05)" : gt(t, 20);
}
function lt(e) {
	return e ? gt(e.toString().trim(), 25) : "rgba(var(--color-theme), 0.25)";
}
function ut(e) {
	let t = vt(e);
	if (!t) return "rgb(var(--color-theme))";
	if (t === "light") return "var(--state-light-active-color, var(--state-active-color, rgb(var(--color-theme))))";
	let n = pt(t);
	return dt(t) ? n ? `rgb(var(--${n}))` : `var(--${t}-color, var(--${t}, rgb(var(--color-theme))))` : t.startsWith("color-") ? `rgb(var(--${t}))` : `var(--${t}, rgb(var(--color-${t}, var(--color-theme))))`;
}
function dt(e) {
	return yt.has(vt(e));
}
function ft(e) {
	return !!pt(e);
}
function pt(e) {
	let t = vt(e);
	return t && mt(t).find(ht) || "";
}
function mt(e) {
	let t = e.startsWith("color-") ? e.slice(6) : e, n = bt[t] || [];
	return [`color-${t}`, ...n.map((e) => `color-${e}`)];
}
function ht(e) {
	return typeof document > "u" ? !1 : [document.documentElement, document.body].filter(Boolean).some((t) => getComputedStyle(t).getPropertyValue(`--${e}`).trim());
}
function gt(e, t) {
	let n = e.toString().trim();
	return `color-mix(in srgb, transparent, ${_t(n) ? n : ut(n)} ${t}%)`;
}
function _t(e) {
	let t = e.toString().trim();
	return t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("#");
}
function vt(e) {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
}
var yt, bt, L = e((() => {
	yt = new Set([
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
	]), bt = {
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
function xt(e, t, n = "Card") {
	if (e.name) return e.name;
	if (e.card_name) return e.card_name;
	if (e.area_name) return St(e.area_name, e, t, n);
	if (e.room_name) return St(e.room_name, e, t, n);
	if (e.status_name) return St(e.status_name, e, t, n);
	let r = e.area;
	return r && t?.areas?.[r] && t.areas[r].name || n;
}
function St(e, t, n, r = "") {
	return typeof e == "string" ? e : (Array.isArray(e) ? e : [e]).map((e) => Ct(e, t, n, r)).filter(Boolean).join(" ");
}
function Ct(e, t, n, r) {
	if (!e) return "";
	if (typeof e == "string") return e;
	if (e.type === "text") return e.text || "";
	if (e.type === "area") return wt(t, n) || "";
	if (e.type === "floor") return Tt(t, n) || "";
	let i = Et(t, n);
	return i && typeof n?.formatEntityName == "function" ? n.formatEntityName(i, { type: e.type }) || "" : e.type === "entity" && (i?.attributes?.friendly_name || i?.entity_id) || "";
}
function wt(e, t) {
	let n = e.area;
	if (n && t?.areas?.[n]) return t.areas[n].name || "";
	let r = Et(e, t);
	return r && typeof t?.formatEntityName == "function" ? t.formatEntityName(r, { type: "area" }) : "";
}
function Tt(e, t) {
	let n = e.area, r = n && t?.areas?.[n] ? t.areas[n].floor_id : "";
	if (r && t?.floors?.[r]) return t.floors[r].name || "";
	let i = Et(e, t);
	return i && typeof t?.formatEntityName == "function" ? t.formatEntityName(i, { type: "floor" }) : "";
}
function Et(e, t) {
	let n = e.main_entity || e.entity || "";
	return n && t?.states ? t.states[n] : null;
}
var Dt = e((() => {}));
//#endregion
//#region src/common/helpers/documentation.js
function Ot(e = "") {
	return e.replace(/^custom:/, "");
}
function kt(e, t = "default") {
	let n = Nt[Ot(e)], r = n?.[t] || n?.default;
	return r ? `${Mt}/${r}` : `${Mt}`;
}
function At(e, t, n = "default") {
	let r = kt(t, n);
	queueMicrotask(() => {
		let t = jt(e, "hui-dialog-edit-card") || jt(e, "hui-dialog-edit-badge");
		!t || t._documentationURL === r || (t._documentationURL = r, t.requestUpdate?.());
	});
}
function jt(e, t) {
	let n = e;
	for (; n;) {
		if (n.localName === t) return n;
		let e = n.getRootNode?.();
		n = n.parentElement || e?.host || null;
	}
	return null;
}
var Mt, Nt, Pt = e((() => {
	Mt = "https://github.com/andyblac/Orbit-Cards/wiki", Nt = {
		"orbit-area-card-dev": {
			default: "Area-Card",
			card: "Area-Card#main-layout",
			status: "Area-Card#status-row",
			buttons: "Area-Card#side-buttons",
			curve: "Area-Card#curved-buttons",
			action: "Area-Card#action-button"
		},
		"orbit-room-card-dev": {
			default: "Area-Card",
			card: "Area-Card#main-layout",
			status: "Area-Card#status-row",
			buttons: "Area-Card#side-buttons",
			curve: "Area-Card#curved-buttons",
			action: "Area-Card#action-button"
		},
		"orbit-status-card-dev": { default: "Status-Card" },
		"orbit-action-card-dev": { default: "Action-Card" },
		"orbit-deck-card-dev": {
			default: "Deck-Card",
			"setup-wrap": "Deck-Card#wrap-layout",
			"setup-tabs": "Deck-Card#tabs-layout",
			"setup-overlay": "Deck-Card#overlay-layout",
			card: "Deck-Card#deck-items"
		}
	};
}));
//#endregion
//#region src/common/helpers/card-registration.js
function Ft({ tag: e, cardClass: t, name: n, description: r, version: i, getEntitySuggestion: a, documentationURL: o, aliases: s = [] }) {
	customElements.get(e) || customElements.define(e, t), s.forEach((e) => {
		customElements.get(e.tag) || customElements.define(e.tag, e.cardClass || t);
	});
	let c = new Set([e, ...s.map((e) => e.tag)]);
	window.customCards = window.customCards || [];
	for (let e = window.customCards.length - 1; e >= 0; --e) c.has(window.customCards[e].type) && window.customCards.splice(e, 1);
	window.customCards.push({
		type: e,
		name: n,
		description: r,
		preview: !0,
		version: i,
		documentationURL: o || kt(e),
		getEntitySuggestion: a
	}), console.info(`%c ${n} %c v${i} `, "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;", "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;");
}
var It = e((() => {
	Pt();
}));
//#endregion
//#region src/common/helpers/config-migration.js
function Lt(e = {}) {
	let t = { ...e || {} }, n = !1;
	return t.type === "custom:orbit-room-card-dev" && (t.type = "custom:orbit-area-card-dev", n = !0), Object.prototype.hasOwnProperty.call(t, "room_name") && (t.area_name === void 0 && t.room_name !== void 0 && t.room_name !== "" && (t.area_name = t.room_name), delete t.room_name, n = !0), {
		config: n ? t : e,
		migrated: n
	};
}
var Rt = e((() => {}));
//#endregion
//#region src/common/helpers/entities.js
function zt(e) {
	let t = e.attributes.unit_of_measurement || "", n = e.state;
	return t ? `${n}${t}` : n === "on" || n === "off" ? n.toUpperCase() : n;
}
function Bt(e) {
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
var Vt = e((() => {})), Ht, Ut = e((() => {
	Ht = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     width=\"120\"\n     height=\"120\"\n     viewBox=\"0 0 24 24\"\n     fill=\"none\">\n\n  <style>\n    .spinner {\n      transform-origin: center;\n      animation: spin 1.2s linear infinite;\n    }\n\n    @keyframes spin {\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n  </style>\n\n  <g class=\"spinner\">\n    <path\n      fill=\"black\"\n      d=\"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z\"\n    />\n  </g>\n\n</svg>";
})), Wt, Gt = e((() => {
	Wt = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <title>garage-fixed</title>\n\n  <!-- Frame -->\n  <path d=\"M22 9V20H20V11H4V20H2V9L12 5L22 9\" fill=\"currentColor\"/>\n\n  <clipPath id=\"doorClip\">\n    <rect x=\"4\" y=\"11\" width=\"16\" height=\"9\" />\n  </clipPath>\n\n  <g clip-path=\"url(#doorClip)\">\n\n    <!-- Animated group (NO base transform!) -->\n    <g>\n\n      <!-- Door panels -->\n      <path d=\"M19 12H5V14H19V12Z\" fill=\"currentColor\"/>\n      <path d=\"M19 15H5V17H19V15Z\" fill=\"currentColor\"/>\n      <path d=\"M19 18H5V20H19V18Z\" fill=\"currentColor\"/>\n\n      <!-- Start OPEN via animation itself -->\n      <animateTransform\n        attributeName=\"transform\"\n        type=\"translate\"\n        from=\"0 -10\"\n        to=\"0 0\"\n        dur=\"1.5s\"\n        begin=\"0s\"\n        fill=\"freeze\"\n      />\n\n    </g>\n  </g>\n</svg>";
})), Kt, qt = e((() => {
	Kt = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n  <title>garage-variant-open</title>\n\n  <!-- Frame / roof -->\n  <path d=\"M22 9V20H20V11H4V20H2V9L12 5L22 9\" fill=\"currentColor\"/>\n\n  <!-- Clip area -->\n  <clipPath id=\"doorClip\">\n    <rect x=\"4\" y=\"11\" width=\"16\" height=\"9\" />\n  </clipPath>\n\n  <g clip-path=\"url(#doorClip)\">\n\n    <!-- Door group (FINAL STATE is open) -->\n    <g class=\"door\" transform=\"translate(0 -10)\">\n\n      <!-- Door panels -->\n      <path d=\"M19 12H5V14H19V12Z\" fill=\"currentColor\"/>\n      <path d=\"M19 15H5V17H19V15Z\" fill=\"currentColor\"/>\n      <path d=\"M19 18H5V20H19V18Z\" fill=\"currentColor\"/>\n\n      <!-- Optional SMIL animation (safe fallback style) -->\n      <animateTransform\n        attributeName=\"transform\"\n        type=\"translate\"\n        from=\"0 0\"\n        to=\"0 -10\"\n        dur=\"1.5s\"\n        begin=\"0s\"\n        fill=\"freeze\"\n      />\n    </g>\n\n  </g>\n</svg>";
})), Jt, Yt = e((() => {
	Jt = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     viewBox=\"0 0 24 24\">\n\n  <style>\n    .arc {\n      opacity: 0;\n      animation-duration: 2s;\n      animation-iteration-count: infinite;\n    }\n\n    /* arc 1 appears first and stays on */\n    .a1 {\n      animation-name: arc1;\n    }\n\n    /* arc 2 appears second and stays on */\n    .a2 {\n      animation-name: arc2;\n    }\n\n    /* arc 3 appears third and stays on */\n    .a3 {\n      animation-name: arc3;\n    }\n\n    @keyframes arc1 {\n      0%   { opacity: 0; }\n      10%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc2 {\n      0%   { opacity: 0; }\n      25%  { opacity: 0; }\n      35%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc3 {\n      0%   { opacity: 0; }\n      50%  { opacity: 0; }\n      60%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n  </style>\n\n  <!-- RADAR ARCS -->\n  <path class=\"arc a1\" fill=\"currentColor\"\n    d=\"M21,1A2,2 0 0,0 23,3V1H21\"/>\n\n  <path class=\"arc a2\" fill=\"currentColor\"\n    d=\"M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33\"/>\n\n  <path class=\"arc a3\" fill=\"currentColor\"\n    d=\"M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67\"/>\n\n  <!-- MAIN ICON -->\n  <path fill=\"currentColor\"\n    d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"\n  />\n</svg>";
})), Xt, Zt = e((() => {
	Xt = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\">\n  <g class=\"start\">\n    <path\n      fill=\"currentColor\"\n      d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"/>\n  </g>\n</svg>";
})), Qt, $t = e((() => {
	Qt = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n     viewBox=\"0 0 24 24\">\n\n  <style>\n    .arc {\n      opacity: 0;\n      animation-duration: 2s;\n      animation-iteration-count: infinite;\n    }\n\n    /* arc 1 appears first and stays on */\n    .a1 {\n      animation-name: arc1;\n    }\n\n    /* arc 2 appears second and stays on */\n    .a2 {\n      animation-name: arc2;\n    }\n\n    /* arc 3 appears third and stays on */\n    .a3 {\n      animation-name: arc3;\n    }\n\n    @keyframes arc1 {\n      0%   { opacity: 0; }\n      10%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc2 {\n      0%   { opacity: 0; }\n      25%  { opacity: 0; }\n      35%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n\n    @keyframes arc3 {\n      0%   { opacity: 0; }\n      50%  { opacity: 0; }\n      60%  { opacity: 1; }\n      75%  { opacity: 1; }\n      100% { opacity: 0; }\n    }\n  </style>\n\n  <!-- RADAR ARCS -->\n  <path class=\"arc a1\" fill=\"currentColor\"\n    d=\"M21,1A2,2 0 0,0 23,3V1H21\"/>\n\n  <path class=\"arc a2\" fill=\"currentColor\"\n    d=\"M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33\"/>\n\n  <path class=\"arc a3\" fill=\"currentColor\"\n    d=\"M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67\"/>\n\n  <!-- MAIN ICON -->\n  <path fill=\"currentColor\"\n    d=\"M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z\"\n  />\n</svg>";
})), en, tn = e((() => {
	en = "<?xml version=\"1.0\" encoding=\"utf-8\"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\r\n<svg fill=\"#000000\" width=\"800px\" height=\"800px\" viewBox=\"0 0 50 50\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path d=\"M22 0L22 7.28125C22.972656 7.109375 23.972656 7 25 7C26.027344 7 27.027344 7.109375 28 7.28125L28 0 Z M 25 9C18.394531 9 12.871094 13.273438 11.40625 19L38.59375 19C37.128906 13.273438 31.605469 9 25 9 Z M 10 21C8.347656 21 7 22.347656 7 24C7 25.652344 8.347656 27 10 27L40 27C41.652344 27 43 25.652344 43 24C43 22.347656 41.652344 21 40 21 Z M 17 30C15.894531 30 15 30.894531 15 32C15 33.105469 15.894531 34 17 34C18.105469 34 19 33.105469 19 32C19 30.894531 18.105469 30 17 30 Z M 25 30C23.894531 30 23 30.894531 23 32C23 33.105469 23.894531 34 25 34C26.105469 34 27 33.105469 27 32C27 30.894531 26.105469 30 25 30 Z M 33 30C31.894531 30 31 30.894531 31 32C31 33.105469 31.894531 34 33 34C34.105469 34 35 33.105469 35 32C35 30.894531 34.105469 30 33 30 Z M 13 38C11.894531 38 11 38.894531 11 40C11 41.105469 11.894531 42 13 42C14.105469 42 15 41.105469 15 40C15 38.894531 14.105469 38 13 38 Z M 21 38C19.894531 38 19 38.894531 19 40C19 41.105469 19.894531 42 21 42C22.105469 42 23 41.105469 23 40C23 38.894531 22.105469 38 21 38 Z M 29 38C27.894531 38 27 38.894531 27 40C27 41.105469 27.894531 42 29 42C30.105469 42 31 41.105469 31 40C31 38.894531 30.105469 38 29 38 Z M 37 38C35.894531 38 35 38.894531 35 40C35 41.105469 35.894531 42 37 42C38.105469 42 39 41.105469 39 40C39 38.894531 38.105469 38 37 38 Z M 9 46C7.894531 46 7 46.894531 7 48C7 49.105469 7.894531 50 9 50C10.105469 50 11 49.105469 11 48C11 46.894531 10.105469 46 9 46 Z M 17 46C15.894531 46 15 46.894531 15 48C15 49.105469 15.894531 50 17 50C18.105469 50 19 49.105469 19 48C19 46.894531 18.105469 46 17 46 Z M 25 46C23.894531 46 23 46.894531 23 48C23 49.105469 23.894531 50 25 50C26.105469 50 27 49.105469 27 48C27 46.894531 26.105469 46 25 46 Z M 33 46C31.894531 46 31 46.894531 31 48C31 49.105469 31.894531 50 33 50C34.105469 50 35 49.105469 35 48C35 46.894531 34.105469 46 33 46 Z M 41 46C39.894531 46 39 46.894531 39 48C39 49.105469 39.894531 50 41 50C42.105469 50 43 49.105469 43 48C43 46.894531 42.105469 46 41 46Z\"/></svg>";
})), nn, rn = e((() => {
	nn = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg width=\"800px\" height=\"800px\" viewBox=\"0 0 50 50\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Animated shower</title>\n  <desc id=\"desc\">A shower head icon with animated falling water droplets.</desc>\n  <style>\n    .fixture {\n      fill: #111111;\n    }\n\n    .drop {\n      fill: #1597d3;\n      opacity: 0;\n      transform-box: fill-box;\n      transform-origin: center;\n      animation: fall 1.35s linear infinite;\n    }\n\n    .drop:nth-child(1) { animation-delay: 0s; }\n    .drop:nth-child(2) { animation-delay: .18s; }\n    .drop:nth-child(3) { animation-delay: .36s; }\n    .drop:nth-child(4) { animation-delay: .54s; }\n    .drop:nth-child(5) { animation-delay: .72s; }\n    .drop:nth-child(6) { animation-delay: .9s; }\n    .drop:nth-child(7) { animation-delay: 1.08s; }\n    .drop:nth-child(8) { animation-delay: .12s; }\n    .drop:nth-child(9) { animation-delay: .3s; }\n    .drop:nth-child(10) { animation-delay: .48s; }\n    .drop:nth-child(11) { animation-delay: .66s; }\n    .drop:nth-child(12) { animation-delay: .84s; }\n\n    @keyframes fall {\n      0% {\n        opacity: 0;\n        transform: translateY(-8px) scale(.72);\n      }\n      18% {\n        opacity: 1;\n      }\n      72% {\n        opacity: .95;\n      }\n      100% {\n        opacity: 0;\n        transform: translateY(8px) scale(1);\n      }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      .drop {\n        opacity: 1;\n        animation: none;\n      }\n    }\n  </style>\n\n  <path class=\"fixture\" d=\"M22 0L22 7.28125C22.972656 7.109375 23.972656 7 25 7C26.027344 7 27.027344 7.109375 28 7.28125L28 0 Z M25 9C18.394531 9 12.871094 13.273438 11.40625 19L38.59375 19C37.128906 13.273438 31.605469 9 25 9 Z M10 21C8.347656 21 7 22.347656 7 24C7 25.652344 8.347656 27 10 27L40 27C41.652344 27 43 25.652344 43 24C43 22.347656 41.652344 21 40 21 Z\"/>\n\n  <g id=\"water\">\n    <circle class=\"drop\" cx=\"17\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"25\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"33\" cy=\"32\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"13\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"21\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"29\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"37\" cy=\"40\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"9\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"17\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"25\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"33\" cy=\"48\" r=\"2\"/>\n    <circle class=\"drop\" cx=\"41\" cy=\"48\" r=\"2\"/>\n  </g>\n</svg>\n";
})), an, on = e((() => {
	an = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Closing shutter</title>\n  <desc id=\"desc\">A blue shutter smoothly closes from twenty percent closed to fully closed.</desc>\n  <style>\n    .shade-closing {\n      transform-box: view-box;\n      transform-origin: 0 4.021px;\n      transform: scaleY(3.943322);\n    }\n\n    .rail-closing {\n      transform: translateY(12.827px);\n    }\n\n    svg[data-orbit-animate=\"true\"] .shade-closing {\n      animation: shade-closing 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    svg[data-orbit-animate=\"true\"] .rail-closing {\n      animation: rail-closing 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    @keyframes shade-closing {\n      from { transform: scaleY(1); }\n      to   { transform: scaleY(3.943322); }\n    }\n\n    @keyframes rail-closing {\n      from { transform: translateY(0); }\n      to   { transform: translateY(12.827px); }\n    }\n  </style>\n\n  <g fill=\"currentColor\" shape-rendering=\"geometricPrecision\">\n    <!-- Top housing -->\n    <path fill-rule=\"evenodd\"\n      d=\"M2.42 2H21.58V3.707H2.42Z M2.991 2.273H6.173V3.359H2.991Z M3.194 2.476H5.97V3.157H3.194Z\"/>\n\n    <!-- Fabric/shade -->\n    <rect class=\"shade-closing\" x=\"2.651\" y=\"4.021\" width=\"18.698\" height=\"4.358\"/>\n\n    <!-- Bottom rail -->\n    <rect class=\"rail-closing\" x=\"2.42\" y=\"8.694\" width=\"19.16\" height=\"0.479\"/>\n  </g>\n</svg>\n";
})), sn, cn = e((() => {
	sn = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" style=\"color: inherit;\" role=\"img\" aria-labelledby=\"title desc\">\n  <title id=\"title\">Opening shutter</title>\n  <desc id=\"desc\">A blue shutter smoothly opens from fully closed to twenty percent closed.</desc>\n  <style>\n    .shade-opening {\n      transform-box: view-box;\n      transform-origin: 0 4.021px;\n      transform: scaleY(0.253593);\n    }\n\n    .rail-opening {\n      transform: translateY(-12.827px);\n    }\n\n    svg[data-orbit-animate=\"true\"] .shade-opening {\n      animation: shade-opening 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    svg[data-orbit-animate=\"true\"] .rail-opening {\n      animation: rail-opening 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n    }\n\n    @keyframes shade-opening {\n      from { transform: scaleY(1); }\n      to   { transform: scaleY(0.253593); }\n    }\n\n    @keyframes rail-opening {\n      from { transform: translateY(0); }\n      to   { transform: translateY(-12.827px); }\n    }\n  </style>\n\n  <g fill=\"currentColor\" shape-rendering=\"geometricPrecision\">\n    <!-- Top housing -->\n    <path fill-rule=\"evenodd\"\n      d=\"M2.42 2H21.58V3.707H2.42Z M2.991 2.273H6.173V3.359H2.991Z M3.194 2.476H5.97V3.157H3.194Z\"/>\n\n    <!-- Fabric/shade -->\n    <rect class=\"shade-opening\" x=\"2.651\" y=\"4.021\" width=\"18.698\" height=\"17.185\"/>\n\n    <!-- Bottom rail -->\n    <rect class=\"rail-opening\" x=\"2.42\" y=\"21.521\" width=\"19.16\" height=\"0.479\"/>\n  </g>\n</svg>\n";
})), ln, un = e((() => {
	ln = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"120\" height=\"120\" fill=\"currentColor\">\n\n  <style>\n    .swirl {\n      transform-origin: 12px 14px;\n      animation: wash 1.5s ease-in-out infinite;\n    }\n\n    @keyframes wash {\n      0%,100% { transform: rotate(0deg); }\n      25%     { transform: rotate(-20deg); }\n      75%     { transform: rotate(20deg); }\n    }\n  </style>\n\n  <!-- machine -->\n  <path\n    fill=\"currentColor\"\n    d=\"M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2\n       M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4\n       M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4\n       M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z\" />\n\n  <!-- animated inner swirl -->\n  <path\n    class=\"swirl\"\n    fill=\"currentColor\"\n    d=\"M14.83,11.17\n       C16.39,12.73 16.39,15.27 14.83,16.83\n       C13.27,18.39 10.73,18.39 9.17,16.83\n       L14.83,11.17\" />\n</svg>";
})), dn, fn = e((() => {
	dn = [
		{
			name: "Fan",
			file: "fan.svg",
			tags: ["bathroom", "fan"]
		},
		{
			name: "Garage Door Closed",
			file: "garage-door_closed.svg",
			tags: ["garage", "door"]
		},
		{
			name: "Garage Door Open",
			file: "garage-door_open.svg",
			tags: ["garage", "door"]
		},
		{
			name: "Motion Detected",
			file: "motion_detected.svg",
			tags: ["motion", "sensor"]
		},
		{
			name: "No Motion",
			file: "motion_off.svg",
			tags: ["motion", "sensor"]
		},
		{
			name: "Shutter Opening",
			file: "shutter-opening.svg",
			revision: "3bfde376",
			tags: [
				"cover",
				"shade",
				"shutter",
				"opening"
			]
		},
		{
			name: "Shutter Closing",
			file: "shutter-closing.svg",
			revision: "458fb44b",
			tags: [
				"cover",
				"shade",
				"shutter",
				"closing"
			]
		},
		{
			name: "Shower On",
			file: "shower_on.svg",
			tags: ["bathroom", "water"]
		},
		{
			name: "Shower Off",
			file: "shower_off.svg",
			tags: ["bathroom", "water"]
		},
		{
			name: "Washing Machine Running",
			file: "washing-machine-running.svg",
			tags: ["kitchen", "washing"]
		}
	];
}));
//#endregion
//#region src/icons/bundled.js
function pn(e) {
	return e?.startsWith("orbit:") && hn[decodeURIComponent(e.slice(6).split("?")[0])] || "";
}
var mn, hn, gn = e((() => {
	Ut(), Gt(), qt(), Yt(), Zt(), $t(), tn(), rn(), on(), cn(), un(), fn(), mn = dn, hn = Object.freeze({
		"fan.svg": Ht,
		"garage-door_closed.svg": Wt,
		"garage-door_open.svg": Kt,
		"motion_detected.svg": Jt,
		"motion_off.svg": Xt,
		"motion_on.svg": Qt,
		"shower_off.svg": en,
		"shower_on.svg": nn,
		"shutter-closing.svg": an,
		"shutter-opening.svg": sn,
		"washing-machine-running.svg": ln
	});
}));
//#endregion
//#region src/common/helpers/icons.js
function _n(e, t) {
	let n = this._config.accent_color || "theme";
	return t ? n === "light" ? this._getEntityColor(e) || this._computeFullColor("theme") : this._computeFullColor(n) : this._computeIconColor(n);
}
function vn(e) {
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
function yn(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".webp") || t.endsWith(".gif");
}
function bn(e) {
	return e ? e.startsWith("orbit:") ? e : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function R(e, t = {}) {
	if (!e) return "";
	let n = t.forceColor !== !1, r = t.animate === !0, i = [
		e,
		n ? "forced" : "auto",
		r ? "animated" : "static"
	].join("::"), a = this.constructor.svgCache, o = a[i];
	if (typeof o == "string" && o !== "loading") return o;
	if (o === "loading") return Cn(i, this), "";
	let s = pn(e);
	if (s) {
		let e = Sn(s, n, r);
		return a[i] = e, e;
	}
	return a[i] = "loading", Cn(i, this), Tn(e).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.text();
	}).then((e) => {
		e = Sn(e, n, r), a[i] = e, wn(i);
	}).catch((t) => {
		console.error("SVG load failed:", e, t), delete a[i], wn(i);
	}), "";
}
function xn(e, t) {
	return !e || !t ? !0 : e[`${t}_svg_color_override`] !== !1;
}
function Sn(e, t, n = !1) {
	let r = e.replace(/<svg\b[^>]*>/i, (e) => {
		let t = e.replace(/\swidth="[^"]*"/i, " width=\"100%\"").replace(/\sheight="[^"]*"/i, " height=\"100%\"");
		return n && (t = t.replace(/^<svg\b/i, "<svg data-orbit-animate=\"true\"")), t;
	});
	return t ? r.replace(/fill="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "fill=\"currentColor\"").replace(/stroke="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi, "stroke=\"currentColor\"").replace(/fill:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "fill:currentColor").replace(/stroke:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi, "stroke:currentColor") : r;
}
function Cn(e, t) {
	t && (En[e] = En[e] || /* @__PURE__ */ new Set(), En[e].add(t));
}
function wn(e) {
	let t = En[e];
	t && (delete En[e], requestAnimationFrame(() => {
		t.forEach((e) => {
			e.isConnected && e.requestUpdate();
		});
	}));
}
function Tn(e) {
	return fetch(e).then((t) => t.ok ? t : fetch(e, { cache: "reload" }));
}
var En, Dn = e((() => {
	gn(), En = {};
}));
//#endregion
//#region src/common/helpers/long-press.js
function On(e, t, n) {
	n && (e.stopPropagation(), this._cancelLongPress(), this._longPressTriggered = !1, this._longPressTimer = setTimeout(() => {
		this._longPressTriggered = !0, this._handleAction(n, t);
	}, this._LONG_PRESS_DELAY));
}
function kn() {
	this._longPressTimer &&= (clearTimeout(this._longPressTimer), null);
}
function An(e) {
	return this._cancelLongPress(), this._longPressTriggered ? (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), !0) : !1;
}
var jn = e((() => {}));
//#endregion
//#region src/common/helpers/templates.js
function Mn(e, t) {
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
var Nn = e((() => {}));
//#endregion
//#region src/common/helpers/updates.js
function Pn(e, t, n = {}) {
	if (!e.has("hass") || e.has("_config") || [...e.keys()].some((e) => e !== "hass") || n.hasTemplates) return !0;
	let r = e.get("hass"), i = this.hass;
	if (!r || !i) return !0;
	let a = [...new Set(t.filter(Boolean))];
	return !a.length && !n.includeZones ? !1 : a.some((e) => r.states?.[e] !== i.states?.[e]) ? !0 : n.includeZones ? In(r, i) : !1;
}
function Fn(e) {
	return Object.keys(e || {}).some((e) => e.endsWith("_template"));
}
function In(e, t) {
	return [...new Set([...Object.keys(e.states || {}), ...Object.keys(t.states || {})].filter((e) => e.startsWith("zone.")))].some((n) => e.states?.[n] !== t.states?.[n]);
}
var Ln = e((() => {}));
//#endregion
//#region src/common/helpers/suggestions.js
function Rn(e = "") {
	return e.split(".")[0] || "";
}
function zn(e, t) {
	let n = e?.entities?.[t];
	if (n?.area_id) return n.area_id;
	let r = n?.device_id;
	return r && e?.devices?.[r]?.area_id || "";
}
function Bn(e, t) {
	let n = e?.states?.[t]?.state;
	return n !== "" && Number.isFinite(Number(n));
}
var Vn = e((() => {})), z, B = e((() => {
	z = {};
}));
//#endregion
//#region src/common/helpers/default-actions.js
function Hn(e, t = "more-info") {
	let n = e?.split(".")[0];
	if (!n) return { action: t };
	let r = Un[n];
	return r ? {
		action: "call-service",
		service: r,
		service_data: { entity_id: e }
	} : Wn.has(n) ? { action: "toggle" } : { action: t };
}
var Un, Wn, Gn = e((() => {
	Un = {
		automation: "automation.trigger",
		button: "button.press",
		input_button: "input_button.press",
		scene: "scene.turn_on",
		script: "script.turn_on"
	}, Wn = new Set([
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
}));
//#endregion
//#region src/cards/area/helpers/lifecycle.js
function Kn(e) {
	if (!e.has("_config") && !e.has("hass")) return;
	this._cardName = this._getCardName("");
	let t = this._config.main_entity || this._config.entity, n = this._config.area, r = t && this.hass ? this.hass.states[t] : null, i = r ? this._getEntityActiveState(r) : !1;
	this._iconColor = this._getMainIconColor(r, i);
	let a = this._config.main_entity_icon, o = this._config.main_entity_icon_on, s = this._config.main_entity_icon_off, c = dr(this._config, n, t), l = c === "custom", u = n && this.hass?.areas?.[n] && this.hass.areas[n].icon || "mdi:sofa", d = l && ((i ? o : s) || a) || "";
	this._mainStateObj = r, this._useNativeMainIcon = !!r && c !== "area" && !d;
	let f = l && i && o ? "main_entity_icon_on" : l && !i && s ? "main_entity_icon_off" : l && a ? "main_entity_icon" : "";
	this._icon = d || u, this._iconSvgForceColor = f ? this._getSvgColorOverride(f) : !0, this._statusItems = qn.call(this), this._buttonModels = Zn.call(this), this._curveButtonModels = Qn.call(this), this._actionButtonModel = $n.call(this);
}
function qn() {
	return [
		1,
		2,
		3
	].map((e) => {
		let t = this._config[`status${e}`];
		if (!t) return null;
		let n = this.hass?.states[t], r = `status${e}`, i = this._config[`${r}_icon`] || "", a = Yn.call(this, r, t), o = a === "custom" ? i : "";
		return {
			entityId: t,
			stateObj: n,
			useStateIcon: a === "entity" && !!n,
			text: Xn.call(this, n, this._config[`status${e}_decimal_places`]),
			icon: o,
			iconPath: this._isImageIcon(o) ? this._resolveIconPath(o) : "",
			isImage: this._isImageIcon(o),
			isHaIcon: Jn(o)
		};
	}).filter(Boolean);
}
function Jn(e) {
	return /^[a-z0-9_-]+:/i.test(e || "");
}
function Yn(e, t = "") {
	let n = this._config?.[`${e}_icon_source`], r = !!(t || this._config?.[e]);
	return n === "custom" ? "custom" : n === "none" ? "none" : n === "entity" && r ? "entity" : this._config?.[`${e}_icon`] ? "custom" : "none";
}
function Xn(e, t) {
	if (!e) return "—";
	if (t === void 0 || t === "") return this.formatState(e);
	let n = Number(t), r = Number(e.state);
	if (!Number.isFinite(n) || !Number.isFinite(r)) return this.formatState(e);
	let i = e.attributes.unit_of_measurement || "";
	return `${r.toFixed(Math.max(0, n))}${i}`;
}
function Zn() {
	return [
		this._config.button1,
		this._config.button2,
		this._config.button3,
		this._config.button4
	].filter(Boolean).map((e, t) => er.call(this, "button", e, t, {
		defaultAction: { action: "toggle" },
		defaultHoldAction: { action: "more-info" },
		getIconColor: ar,
		getBackgroundColor: ir
	})).filter(Boolean);
}
function Qn() {
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
		let i = er.call(this, "curve_button", t, r, {
			defaultAction: { action: "more-info" },
			defaultHoldAction: null,
			getIconColor: cr,
			getBackgroundColor: null
		});
		return i ? (i.position = e ? r : n.indexOf(t), i) : null;
	}).filter(Boolean);
}
function $n() {
	let e = this._config.action_button;
	return e ? er.call(this, "action_button", e, 0, {
		key: "action_button",
		defaultAction: Hn(e),
		defaultHoldAction: null,
		getIconColor: lr,
		getBackgroundColor: null
	}) : null;
}
function er(e, t, n, r) {
	let i = this.hass?.states[t];
	if (!i) return null;
	let a = r.key || `${e}${n + 1}`, o = this._config?.[`${a}_state_template`], s = this._evaluateStateTemplate(o, t), c = s == null ? this._getEntityActiveState(i) : s === !0 || s === "on", l = rr.call(this, a, t), u = nr.call(this, a, c), d = this._isImageIcon(u), f = this._buttonIconStates?.get(a), p = !!(f && f.entityId === t && f.isOn !== c);
	return this._buttonIconStates ||= /* @__PURE__ */ new Map(), this._buttonIconStates.set(a, {
		entityId: t,
		isOn: c
	}), {
		entityId: t,
		stateObj: i,
		useStateIcon: !!i && (l === "entity" || !u),
		holdAction: this._config?.[`${a}_hold_action`] || r.defaultHoldAction,
		doubleTapAction: this._config?.[`${a}_double_tap_action`] || null,
		tapAction: this._config?.[`${a}_tap_action`] || r.defaultAction,
		backgroundColor: r.getBackgroundColor ? r.getBackgroundColor.call(this, a, i, c) : "",
		icon: u,
		iconColor: r.getIconColor.call(this, a, i, c),
		iconPath: d ? this._resolveIconPath(u) : "",
		svgForceColor: tr.call(this, a, c),
		animateIcon: p,
		isImage: d
	};
}
function tr(e, t) {
	if (rr.call(this, e) !== "custom") return !0;
	let n = this._config?.[`${e}_icon`], r = t && this._config?.[`${e}_icon_on`] ? `${e}_icon_on` : !t && this._config?.[`${e}_icon_off`] ? `${e}_icon_off` : n ? `${e}_icon` : "";
	return r ? this._getSvgColorOverride(r) : !0;
}
function nr(e, t) {
	let n = this._config?.[`${e}_icon`], r = this._config?.[`${e}_icon_on`], i = this._config?.[`${e}_icon_off`];
	return rr.call(this, e) === "entity" ? "" : (t ? r : i) || n || "";
}
function rr(e, t = "") {
	let n = this._config?.[`${e}_icon_source`], r = !!(t || this._config?.[e]);
	return n === "custom" ? "custom" : n === "entity" && r ? "entity" : this._config?.[`${e}_icon`] || this._config?.[`${e}_icon_on`] || this._config?.[`${e}_icon_off`] ? "custom" : "entity";
}
function ir(e, t, n) {
	if (n) return this._computeButtonBackground(or.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return !r || r === "theme" ? "rgba(var(--color-theme),0.05)" : gt(r, 10);
}
function ar(e, t, n) {
	if (n) return this._computeFullColor(or.call(this, e, t));
	let r = this._config[`${e}_off_color`] || "theme";
	return r.startsWith("rgba(") ? r : this._computeIconColor(r);
}
function or(e, t) {
	let n = this._config[`${e}_on_color`] || "theme";
	return n === "light" ? this._getEntityColor(t) || this._config.accent_color || "theme" : n;
}
function sr(e, t, n) {
	let r = this._config.accent_color || "theme";
	return r === "theme" ? n ? "rgba(var(--color-theme),0.7)" : "rgba(var(--color-theme),0.2)" : n ? this._computeFullColor(r) : gt(r, 40);
}
function cr(e, t, n) {
	let r = n ? this._config[`${e}_on_color`] : this._config[`${e}_off_color`];
	return r && r !== "theme" ? ur.call(this, e, t, n, r) : sr.call(this, e, t, n);
}
function lr(e, t, n) {
	let r = n ? this._config[`${e}_on_color`] : this._config[`${e}_off_color`];
	return r && r !== "theme" ? ur.call(this, e, t, n, r) : sr.call(this, e, t, n);
}
function ur(e, t, n, r) {
	return n ? ar.call(this, e, t, !0) : r.startsWith("rgba(") ? r : gt(r, 40);
}
function dr(e = {}, t, n) {
	let r = e.main_entity_icon_source, i = !!t, a = !!n;
	return r === "custom" ? r : r === "area" && i ? "area" : r === "entity" && a ? "entity" : i ? "area" : a ? "entity" : "area";
}
var fr = e((() => {
	L(), Gn();
})), pr, mr, hr, gr = e((() => {
	pr = {
		ATTRIBUTE: 1,
		CHILD: 2,
		PROPERTY: 3,
		BOOLEAN_ATTRIBUTE: 4,
		EVENT: 5,
		ELEMENT: 6
	}, mr = (e) => (...t) => ({
		_$litDirective$: e,
		values: t
	}), hr = class {
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
})), _r, V, vr = e((() => {
	Re(), gr(), _r = class extends hr {
		constructor(e) {
			if (super(e), this.it = k, e.type !== pr.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
		}
		render(e) {
			if (e === k || e == null) return this._t = void 0, this.it = e;
			if (e === O) return e;
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
	}, _r.directiveName = "unsafeHTML", _r.resultType = 1, V = mr(_r);
})), H = e((() => {
	vr();
}));
//#endregion
//#region src/cards/area/renders/buttons.js
function yr(e) {
	return e ? D`
      <button
        class="entity-button"
        style="background:${e.backgroundColor};"
        @click=${this._handleButtonClick}
        @dblclick=${this._handleButtonDoubleClick}

        @pointerdown=${this._handleButtonPointerDown}

        @pointerup=${this._finishLongPress}
        @pointerleave=${this._cancelLongPress}
        @pointercancel=${this._cancelLongPress}

        .dataEntity=${e.entityId}
        .dataAction=${e.tapAction}
        .dataHoldAction=${e.holdAction}
        .dataDoubleAction=${e.doubleTapAction}
      >
        ${e.isImage ? D`
              <div
                class="button-image-icon"
                style="color:${e.iconColor};"
              >
                ${e.iconPath ? V(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon)) : ""}
              </div>
            ` : e.useStateIcon && e.stateObj ? D`
                <ha-state-icon
                  .stateObj=${e.stateObj}
                  style="color:${e.iconColor};"
                ></ha-state-icon>
              ` : D`
              <ha-icon
                .icon=${e.icon}
                style="color:${e.iconColor};"
              ></ha-icon>
            `}
      </button>
    ` : null;
}
var br = e((() => {
	M(), H();
}));
//#endregion
//#region src/cards/area/renders/area-card.js
function xr() {
	let e = this._buttonModels || [], t = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", n = t ? this._getInlineSvg(t, this._iconSvgForceColor) : "";
	return D`
    <ha-card
      tabindex="0"
      @click=${this._handleTap}
      @dblclick=${this._handleCardDoubleTap}
      @pointerdown=${this._handleCardPointerDown}
      @pointerup=${this._finishLongPress}
      @pointerleave=${this._cancelLongPress}
      @pointercancel=${this._cancelLongPress}
    >
      <div class="container">
        <div class="content">

            <div class="header ${e.length >= 3 ? "compressed" : ""}">
              <div class="card-name" style="color:${this._areaColor}">
                ${this._cardName}
            </div>

            <div class="status" style="color:${this._statusColor}">
              ${Sr.call(this)}
            </div>
          </div>

          ${e.length ? D`
                <div class="button-column" style="--button-count:${e.length}">
                  ${e.map((e) => this._renderButtons(e))}
                </div>
              ` : ""}

        </div>

        <div
          class="circle"
          style="background:${this._circleColor}"

          @pointerdown=${this._handleMainEntityPointerDown}

          @pointerup=${this._finishLongPress}
          @pointerleave=${this._cancelLongPress}
          @pointercancel=${this._cancelLongPress}
        >

          ${this._renderCurveButtons()}

          ${this._isImageIcon(this._icon) ? D`
                <div
                  class="main-image-icon"
                  style="color:${this._iconColor};"
                >
                  ${n ? V(n) : D`<img src=${t} alt="" />`}
                </div>
              ` : this._useNativeMainIcon && this._mainStateObj ? D`
                  <ha-state-icon
                    class="main-icon"
                    .stateObj=${this._mainStateObj}
                    style="color:${this._iconColor}"
                  ></ha-state-icon>
                ` : D`
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
function Sr() {
	let e = this._statusItems || [];
	if (!e.length) return this._statusText || "";
	let t = this._config?.status_separator || "|";
	return e.map((e, n) => D`
    ${n > 0 ? D`
          <span class="status-separator">
            ${t}
          </span>
        ` : ""}
    <span class="status-item">
      ${Cr.call(this, e)}
      <span>${e.text}</span>
    </span>
  `);
}
function Cr(e) {
	return !e.icon && !e.useStateIcon ? "" : e.isImage ? D`
      <span class="status-prefix-icon status-prefix-image">
        ${e.iconPath ? V(this._getInlineSvg(e.iconPath, !0)) : ""}
      </span>
    ` : e.useStateIcon && e.stateObj ? D`
      <ha-state-icon
        class="status-prefix-icon"
        .stateObj=${e.stateObj}
      ></ha-state-icon>
    ` : e.isHaIcon ? D`
      <ha-icon
        class="status-prefix-icon"
        .icon=${e.icon}
      ></ha-icon>
    ` : D`
    <span class="status-prefix-text">
      ${e.icon}
    </span>
  `;
}
var wr = e((() => {
	M(), H();
})), Tr, Er, Dr, Or, U, kr, Ar, jr, Mr, Nr = e((() => {
	Re(), {I: Tr} = Fe, Er = (e) => e, Dr = () => document.createComment(""), Or = (e, t, n) => {
		let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
		if (n === void 0) n = new Tr(r.insertBefore(Dr(), i), r.insertBefore(Dr(), i), e, e.options);
		else {
			let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
			if (o) {
				let t;
				n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
			}
			if (t !== i || o) {
				let e = n._$AA;
				for (; e !== t;) {
					let t = Er(e).nextSibling;
					Er(r).insertBefore(e, i), e = t;
				}
			}
		}
		return n;
	}, U = (e, t, n = e) => (e._$AI(t, n), e), kr = {}, Ar = (e, t = kr) => e._$AH = t, jr = (e) => e._$AH, Mr = (e) => {
		e._$AR(), e._$AA.remove();
	};
})), Pr, Fr, Ir = e((() => {
	Re(), gr(), Nr(), Pr = (e, t, n) => {
		let r = /* @__PURE__ */ new Map();
		for (let i = t; i <= n; i++) r.set(e[i], i);
		return r;
	}, Fr = mr(class extends hr {
		constructor(e) {
			if (super(e), e.type !== pr.CHILD) throw Error("repeat() can only be used in text expressions");
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
			let i = jr(e), { values: a, keys: o } = this.dt(t, n, r);
			if (!Array.isArray(i)) return this.ut = o, a;
			let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
			for (; d <= f && p <= m;) if (i[d] === null) d++;
			else if (i[f] === null) f--;
			else if (s[d] === o[p]) c[p] = U(i[d], a[p]), d++, p++;
			else if (s[f] === o[m]) c[m] = U(i[f], a[m]), f--, m--;
			else if (s[d] === o[m]) c[m] = U(i[d], a[m]), Or(e, c[m + 1], i[d]), d++, m--;
			else if (s[f] === o[p]) c[p] = U(i[f], a[p]), Or(e, i[d], i[f]), f--, p++;
			else if (l === void 0 && (l = Pr(o, p, m), u = Pr(s, d, f)), l.has(s[d])) if (l.has(s[f])) {
				let t = u.get(o[p]), n = t === void 0 ? null : i[t];
				if (n === null) {
					let t = Or(e, i[d]);
					U(t, a[p]), c[p] = t;
				} else c[p] = U(n, a[p]), Or(e, i[d], n), i[t] = null;
				p++;
			} else Mr(i[f]), f--;
			else Mr(i[d]), d++;
			for (; p <= m;) {
				let t = Or(e, c[m + 1]);
				U(t, a[p]), c[p++] = t;
			}
			for (; d <= f;) {
				let e = i[d++];
				e !== null && Mr(e);
			}
			return this.ut = o, Ar(e, c), O;
		}
	});
})), Lr = e((() => {
	Ir();
}));
//#endregion
//#region src/cards/area/renders/curve-buttons.js
function Rr() {
	let e = this._curveButtonModels || [], t = this._actionButtonModel;
	return D`
      <div class="curve-buttons">

        ${Fr(e, (e, t) => t, (e) => e.empty ? D`
              <div class="curve-button pos-${e.position}"></div>
            ` : D`
            <button
              class="curve-button pos-${e.position}"
                @click=${this._handleCurveButtonClick}
                @dblclick=${this._handleCurveButtonDoubleClick}
                @pointerdown=${this._handleButtonPointerDown}

                @pointerup=${this._finishLongPress}
                @pointerleave=${this._cancelLongPress}
                @pointercancel=${this._cancelLongPress}

                .dataEntity=${e.entityId}
                .dataAction=${e.tapAction}
                .dataHoldAction=${e.holdAction}
                .dataDoubleAction=${e.doubleTapAction}
            >
              ${e.isImage ? D`
                    <div
                      class="curve-image-icon"
                      style="color:${e.iconColor};"
                    >
                      ${V(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon))}
                    </div>
                  ` : e.useStateIcon && e.stateObj ? D`
                      <ha-state-icon
                        .stateObj=${e.stateObj}
                        style="color:${e.iconColor};"
                      ></ha-state-icon>
                    ` : D`
                    <ha-icon
                      .icon=${e.icon}
                      style="color:${e.iconColor};"
                    ></ha-icon>
                  `}
            </button>
          `)}

      ${t ? zr.call(this, t) : ""}

      </div>
    `;
}
function zr(e) {
	return D`
    <button
      class="curve-button action-button"
        @click=${this._handleCurveButtonClick}
        @dblclick=${this._handleCurveButtonDoubleClick}
        @pointerdown=${this._handleButtonPointerDown}

        @pointerup=${this._finishLongPress}
        @pointerleave=${this._cancelLongPress}
        @pointercancel=${this._cancelLongPress}

        .dataEntity=${e.entityId}
        .dataAction=${e.tapAction}
        .dataHoldAction=${e.holdAction}
        .dataDoubleAction=${e.doubleTapAction}
    >
      ${e.isImage ? D`
            <div
              class="curve-image-icon"
              style="color:${e.iconColor};"
            >
              ${V(this._getInlineSvg(e.iconPath, e.svgForceColor, e.animateIcon))}
            </div>
          ` : e.useStateIcon && e.stateObj ? D`
              <ha-state-icon
                .stateObj=${e.stateObj}
                style="color:${e.iconColor};"
              ></ha-state-icon>
            ` : D`
            <ha-icon
              .icon=${e.icon}
              style="color:${e.iconColor};"
            ></ha-icon>
          `}
    </button>
  `;
}
var Br = e((() => {
	M(), Lr(), H();
})), Vr, Hr = e((() => {
	M(), Vr = c`
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
})), Ur, Wr = e((() => {
	M(), Ur = c`
  :host {
    display: block;
  }

  ha-card {
    display: block;
    width: 100%;
    box-sizing: border-box;
    background: var(--ha-card-background, var(--card-background-color, #1a1a1a));
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
})), Gr, Kr = e((() => {
	M(), Gr = c`
  .main-icon {
    --orbit-main-icon-size: 45%;
    --mdc-icon-size: var(--orbit-main-icon-size);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  ha-state-icon.main-icon {
    width: var(--orbit-main-icon-size);
    height: var(--orbit-main-icon-size);
    --mdc-icon-size: 100%;
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
})), qr, Jr = e((() => {
	M(), qr = c`
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

  ha-state-icon.status-prefix-icon {
    --mdc-icon-size: 100%;
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
})), Yr, Xr = e((() => {
	M(), Yr = c`
  ha-card {
    aspect-ratio: 1 / 1;
  }

  .container {
    --button-area-width: clamp(46px, 23.5cqw, 210px);
  }
`;
})), Zr, Qr = e((() => {
	M(), Zr = c`
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
})), $r, ei = e((() => {
	M(), $r = c`
  .curve-buttons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 4;
  }
`;
})), ti, ni = e((() => {
	M(), ti = c`
  .curve-button ha-icon,
  .curve-button ha-state-icon {
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
  .curve-button.action-button ha-state-icon,
  .curve-button.action-button .curve-image-icon {
    width: clamp(30px, 16cqw, 96px);
    height: clamp(30px, 16cqw, 96px);
  }
`;
})), ri, ii = e((() => {
	M(), ri = c`
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
})), ai, oi = e((() => {
	M(), ai = c`
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

  .entity-button ha-state-icon {
    width: 54%;
    height: 54%;
    --mdc-icon-size: 100%;
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
})), si, ci = e((() => {
	M(), si = c`
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
})), li, ui = e((() => {
	M(), li = c`
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
    z-index: 3;
  }
`;
})), di, fi = e((() => {
	Hr(), Wr(), Kr(), Jr(), Xr(), Qr(), ei(), ni(), ii(), oi(), ci(), ui(), di = [
		Ur,
		Vr,
		Gr,
		Yr,
		qr,
		li,
		ai,
		si,
		Zr,
		$r,
		ti,
		ri
	];
}));
//#endregion
//#region src/common/editor/helpers/icon.js
function W(e, t) {
	return Array.isArray(t) ? pi(e, t.map((t) => W(e, t))) : e._t ? e._t(t) : t;
}
function pi(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : mi(e)).join(" ") : t.join(" ");
}
function mi(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function hi(e) {
	if (!e) return !1;
	let t = e.split("?")[0].toLowerCase();
	return t.endsWith(".svg") || t.endsWith(".png") || t.endsWith(".gif") || t.endsWith(".webp");
}
function gi(e) {
	return e ? e.startsWith("orbit:") ? e : e.startsWith("local:") ? `/local/icons/${e.slice(6)}` : e.startsWith("/") || e.startsWith("http") ? e : `/local/icons/${e}` : "";
}
function _i(e, t, n) {
	let r = this._config?.[t] || "", i = `${this._iconPickerPrefix || "icon"}-${t}`, a = r && this._isImageIcon(r) ? "files" : "ha", o = this._iconPickerKey === i && this._iconPickerTab || a;
	return o === "files" && !this._orbitIconFilesLoading && !this._localIconFilesLoading && !(this._orbitIconFiles || []).length && !(this._localIconFiles || []).length && queueMicrotask(() => this._loadLocalIconFiles?.(r)), D`
    <div class="field">
      ${e ? D`<label>${W(this, e)}</label>` : ""}

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
            ${W(this, "Icons")}
          </button>
          <button
            type="button"
            class=${o === "files" ? "active" : ""}
            @click=${() => {
		this._iconPickerKey = i, this._iconPickerTab = "files", this._loadLocalIconFiles?.(r);
	}}
          >
            ${W(this, "Files")}
          </button>
        </div>

        ${o === "files" ? Si.call(this, t, r) : xi.call(this, t, r)}
      </div>
    </div>
  `;
}
function vi({ label: e = "Icon", sourceKey: t = "main_entity_icon_source", entityKey: n = "main_entity", areaKey: r = "area", allowArea: i = !1, allowNone: a = !1, customIconKeys: o = [], renderCustom: s } = {}) {
	let c = yi(this._config, {
		sourceKey: t,
		entityKey: n,
		areaKey: r,
		allowArea: i,
		allowNone: a,
		customIconKeys: o
	}), l = c === "custom", u = [
		a ? {
			label: W(this, "None"),
			value: "none"
		} : null,
		i ? {
			label: W(this, "Area"),
			value: "area"
		} : null,
		{
			label: W(this, "Entity"),
			value: "entity"
		},
		{
			label: W(this, "Custom"),
			value: "custom"
		}
	].filter(Boolean);
	return D`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${W(this, e)}</label>

        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: u } }}
          .value=${c}
          @value-changed=${(e) => {
		this._handleConfigUpdate(t, e.detail.value || (a ? "none" : "custom"));
	}}
        ></ha-selector>
      </div>

      ${l && s ? s.call(this) : ""}
    </div>
  `;
}
function yi(e = {}, { sourceKey: t = "main_entity_icon_source", entityKey: n = "main_entity", areaKey: r = "area", allowArea: i = !1, allowNone: a = !1, customIconKeys: o = [] } = {}) {
	let s = e[t], c = i && !!e[r], l = !!(e[n] || e.entity), u = o.some((t) => !!e[t]);
	if (s === "custom") return "custom";
	if (s === "none" && a) return "none";
	if (s === "area" && c) return "area";
	if (s === "entity" && l) return "entity";
	if (i) {
		if (c) return "area";
		if (l) return "entity";
	}
	return u ? "custom" : a ? "none" : l ? "entity" : i ? "area" : "entity";
}
async function bi(e = "") {
	let t = Vi(e);
	this._localIconFilesLoading = !0, this._orbitIconFilesLoading = !0, this.requestUpdate();
	let [n, r] = await Promise.all([Pi(), Fi()]);
	this._orbitIconFiles = Ui(n), this._localIconFiles = Ui([t?.source === "local" || !t?.source ? t : null, ...r]), this._orbitIconFilesLoading = !1, this._localIconFilesLoading = !1, this.requestUpdate();
}
function xi(e, t) {
	return D`
    <ha-icon-picker
      .hass=${this.hass}
      .value=${t && !this._isImageIcon(t) ? t : ""}
      @value-changed=${(t) => {
		this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-icon-picker>
  `;
}
function Si(e, t) {
	let n = this._orbitIconFiles || [], r = this._localIconFiles || [], i = Ci([...n, ...r]);
	return this._orbitIconFilesLoading || this._localIconFilesLoading ? D`
      <div class="icon-picker-note">${W(this, "Loading files...")}</div>
    ` : !n.length && !r.length ? D`
      <div class="icon-picker-note">
        ${W(this, "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.")}
      </div>
    ` : D`
    <ha-generic-picker
      .value=${t && this._isImageIcon(t) ? t : ""}
      .getItems=${(e) => Ti(i, e)}
      .rowRenderer=${(e) => Ei.call(this, e)}
      .valueRenderer=${(e) => Di.call(this, i.find((t) => t.id === e))}
      .notFoundLabel=${W(this, "No matching files")}
      .emptyLabel=${""}
      .noSort=${!0}
      @value-changed=${(t) => {
		t.stopPropagation(), this._handleConfigUpdate(e, t.detail.value || "");
	}}
    ></ha-generic-picker>
  `;
}
function Ci(e) {
	return Ui(e).map((e) => {
		let t = Hi(e), n = wi(e);
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
function wi(e) {
	return `${e.source ? `${e.source}:` : ""}${(e.name || e.file || "").trim().replace(/\s+/g, "-")}`;
}
function Ti(e, t = "") {
	let n = t.trim().toLowerCase();
	return n ? e.filter((e) => Object.values(e.search_labels || {}).some((e) => String(e).toLowerCase().includes(n))) : e;
}
function Ei(e) {
	return D`
    <ha-combo-box-item type="button" compact>
      ${Oi.call(this, e)}
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
}
function Di(e) {
	return e ? D`
    ${Oi.call(this, e)}
    <span slot="headline">${e.primary}</span>
  ` : "";
}
function Oi(e) {
	return e?.iconFile ? D`
    <span
      slot="start"
      class="file-picker-preview"
      style=${Ai()}
    >
      ${ki.call(this, e.iconFile)}
    </span>
  ` : "";
}
function ki(e) {
	let t = Hi(e), n = this._resolveIconPath(t);
	if (!n) return D``;
	let r = this._getInlineSvg ? this._getInlineSvg(n) : "", i = this.hass?.themes?.darkMode ?? this.hass?.selectedTheme?.dark ?? !1, a = Ai(), o = ji(i);
	return D`
    <span
      class="file-picker-preview-inner"
      style=${a}
    >
      ${r ? D`${V(Mi(r))}` : D`
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
function Ai() {
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
function ji(e) {
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
function Mi(e) {
	if (!e) return "";
	let t = Ni(e.replace(/<\?xml[^>]*>/gi, "").trim()), n = t.match(/<svg\b[^>]*>/i)?.[0];
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
function Ni(e) {
	let t = "(?!none\\b|currentColor\\b|transparent\\b|inherit\\b|url\\()(?:rgb\\([^)]*\\)|rgba\\([^)]*\\)|hsl\\([^)]*\\)|hsla\\([^)]*\\)|[^\"';)]+)";
	return e.replace(RegExp(`\\s(fill|stroke)=(["'])${t}\\2`, "gi"), (e, t) => ` ${t}="currentColor"`).replace(RegExp(`(fill|stroke)\\s*:\\s*${t}`, "gi"), (e, t) => `${t}:currentColor`);
}
async function Pi() {
	return mn.filter(zi).map((e) => Bi(e, "orbit"));
}
async function Fi() {
	let e = Array.isArray(window.ORBIT_ICON_FILES) ? window.ORBIT_ICON_FILES : [], t = await Ii([
		"/local/icons/manifest.json",
		"/local/icons/orbit-icons.json",
		"/local/icons/icons.json"
	]), n = await Li();
	return [
		...e,
		...t,
		...n
	].filter(zi).map((e) => Bi(e, "local"));
}
async function Ii(e) {
	for (let t of e) try {
		let e = await fetch(t, { cache: "no-store" });
		if (!e.ok) continue;
		let n = await e.json(), r = Array.isArray(n) ? n : n.files;
		if (Array.isArray(r)) return r.filter(zi).map((e) => Bi(e));
	} catch {}
	return [];
}
async function Li() {
	try {
		let e = await fetch("/local/icons/", { cache: "no-store" });
		return e.ok ? [...(await e.text()).matchAll(/href=["']([^"']+)["']/gi)].map((e) => e[1]) : [];
	} catch {
		return [];
	}
}
function Ri(e) {
	return e ? (typeof e == "object" ? e.file : e).toString().split("?")[0].split("/").pop() : "";
}
function zi(e) {
	return hi(Ri(e));
}
function Bi(e, t = "") {
	let n = Ri(e);
	return n ? {
		file: n,
		name: typeof e == "object" && e.name || n,
		tags: Array.isArray(e?.tags) ? e.tags : [],
		source: e?.source || t
	} : null;
}
function Vi(e) {
	if (!e || !zi(e)) return null;
	let t = Ri(e);
	return t ? {
		file: t,
		name: t,
		tags: [],
		source: e?.toString().startsWith("orbit:") ? "orbit" : e?.toString().startsWith("local:") ? "local" : ""
	} : null;
}
function Hi(e) {
	return e.source === "orbit" ? `orbit:${e.file}` : e.source === "local" ? `local:${e.file}` : e.file;
}
function Ui(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter(Boolean).filter((e) => {
		let n = `${e.source || ""}:${e.file}`;
		return t.has(n) ? !1 : (t.add(n), !0);
	}).sort((e, t) => (e.name || e.file).localeCompare(t.name || t.file));
}
var Wi = e((() => {
	M(), H(), gn();
}));
//#endregion
//#region src/common/editor/helpers/inputs.js
function Gi(e, t) {
	return Array.isArray(t) ? Ki(e, t.map((t) => Gi(e, t))) : e._t ? e._t(t) : t;
}
function Ki(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : qi(e)).join(" ") : t.join(" ");
}
function qi(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function Ji(e, t, n, r = {}) {
	let i = r.externalLabel === !0, a = r.value ?? this._config?.[t] ?? "", o = r.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return D`
      <div class="field">
        ${i ? D`<label>${Gi(this, e)}</label>` : ""}

        <ha-selector
          .hass=${this.hass}
          .label=${i ? "" : Gi(this, e)}
          .selector=${{ text: {} }}
          .value=${a}
          .placeholder=${n}
          @value-changed=${(e) => o(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
}
function Yi(e, t, n = {}) {
	let r = n.value ?? this._config?.[t] ?? "", i = n.helper ?? "states[entity.entity_id].attributes.percentage > 50", a = n.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return D`
      <div class="field">
        <ha-selector
          .hass=${this.hass}
          .label=${Gi(this, e)}
          .selector=${{ text: {} }}
          .value=${r}
          .placeholder=${i}
          @value-changed=${(e) => a(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
}
function Xi(e, t, n = {}) {
	let r = n.value ?? this._config?.[t] ?? "", i = n.min ?? 0, a = n.step ?? 1, o = n.onValueChanged || ((e) => this._handleConfigUpdate(t, e));
	return D`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${Gi(this, e)}
        .selector=${{ number: {
		min: i,
		step: a,
		mode: "box"
	} }}
        .value=${r}
        @value-changed=${(e) => o(e.detail.value)}
      ></ha-selector>
    </div>
  `;
}
var Zi = e((() => {
	M();
}));
//#endregion
//#region src/common/editor/helpers/config.js
function Qi(e, t) {
	let n = {
		...e || {},
		...t
	};
	return Object.keys(n).forEach((e) => {
		n[e] === void 0 && delete n[e];
	}), n;
}
function G(e, t = {}) {
	let n = { ...t };
	return e.forEach((e) => {
		n[e] = void 0;
	}), n;
}
function K(e, t = []) {
	return G([e, ...t]);
}
function $i(e, t = []) {
	return G([e, ...t.map((t) => `${e}${t}`)]);
}
var ea = e((() => {}));
//#endregion
//#region src/common/editor/helpers/renders.js
function q(e, t, n) {
	return Array.isArray(t) ? ta(e, t.map((t) => q(e, t, n))) : e._t ? e._t(t, n) : t;
}
function ta(e, t) {
	return (e?.hass?.locale?.language || e?.hass?.language || "en").toLowerCase().startsWith("en") ? t.map((e, t) => t === 0 ? e : na(e)).join(" ") : t.join(" ");
}
function na(e = "") {
	return e.replace(/^(\p{L})/u, (e) => e.toLocaleLowerCase());
}
function ra(e, t, n) {
	let r = this._config?.[t] || "";
	return ia.call(this, e, t, r, (e) => this._handleConfigUpdate(t, e), n);
}
function ia(e, t, n, r, i) {
	ma.call(this);
	let a = aa.call(this, n, i), o = Na(n || a), s = this._colorPickerKey === t && this._colorPickerTab || o;
	return D`
    <div class="field">
      <div class="color-row">
        <div
          class="color-popover"
          @click=${(e) => e.stopPropagation()}
        >
          <div class="color-tabs">
            <button
              type="button"
              class=${s === "picker" ? "active" : ""}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "picker", this._themeColorPickerOpen = !1;
		let e = n || a;
		if (e && !Pa(e)) {
			let t = this._getColorPickerValue(e);
			t && r(t);
		}
	}}
            >
              ${q(this, "Color")}
            </button>
            <button
              type="button"
              class=${s === "theme" ? "active" : ""}
              @click=${() => {
		this._colorPickerKey = t, this._colorPickerTab = "theme", this._themeColorPickerOpen = !1, this._themeColorSearch = "";
	}}
            >
              ${q(this, "Theme")}
            </button>
          </div>

          ${s === "theme" ? D`
                ${sa.call(this, e, n, r, a)}
              ` : D`
                ${oa.call(this, e, n, r, a)}
              `}
        </div>
      </div>
    </div>
  `;
}
function aa(e, t) {
	return t || e || "theme";
}
function oa(e, t, n, r = t) {
	let i = Pa(t) ? this._getColorPickerValue(t) : "", a = i || (Pa(t) ? this._getColorPickerValue(t) : this._getColorPickerValue(t || r)) || "#000000";
	return D`
    <div
      class="native-color-picker-field ${i ? "has-value" : ""}"
      @click=${(e) => e.stopPropagation()}
    >
      <input
        class="native-color-picker-input"
        type="color"
        .value=${a}
        @input=${(e) => n(e.target.value)}
        @change=${(e) => n(e.target.value)}
      />

      ${i ? D`
            <span
              class="native-color-picker-swatch"
              style=${`background-color:${i};`}
            ></span>
            <span class="native-color-picker-text">
              ${e ? D`
                    <span class="native-color-picker-label">
                      ${q(this, e)}
                    </span>
                  ` : ""}
              <span class="native-color-picker-value">
                ${i.toUpperCase()}
              </span>
            </span>
          ` : D`
            <span class="native-color-picker-empty-swatch"></span>
            <span class="native-color-picker-text">
              ${e ? D`
                    <span class="native-color-picker-label">
                      ${q(this, e)}
                    </span>
                  ` : ""}
              <span class="native-color-picker-value empty"></span>
            </span>
          `}

      ${i ? D`
            <button
              type="button"
              class="native-color-picker-clear"
              aria-label=${q(this, "Clear")}
              @click=${(e) => {
		e.preventDefault(), e.stopPropagation(), n("");
	}}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          ` : ""}

      <ha-icon
        class="native-color-picker-arrow"
        icon="mdi:menu-down"
      ></ha-icon>
    </div>
  `;
}
function sa(e, t, n, r = t) {
	let i = t || r, a = Na(i) === "theme" ? va(i) || "theme" : "", o = pa.call(this);
	return D`
    <div
      class="theme-color-picker"
      @click=${(e) => e.stopPropagation()}
    >
      <ha-generic-picker
        .label=${e ? q(this, e) : ""}
        .value=${a}
        .getItems=${() => o}
        .rowRenderer=${(e) => ca.call(this, e)}
        .valueRenderer=${(e) => la.call(this, o.find((t) => t.id === e))}
        .notFoundLabel=${q(this, "No matching colors")}
        .emptyLabel=${""}
        .noSort=${!0}
        @value-changed=${(e) => {
		e.stopPropagation(), n(e.detail.value || "");
	}}
      ></ha-generic-picker>
    </div>
  `;
}
function ca(e) {
	return D`
    <ha-combo-box-item type="button" compact>
      ${ua.call(this, e)}
      <span slot="headline">${e.primary}</span>
      ${da(e)}
    </ha-combo-box-item>
  `;
}
function la(e) {
	return e ? D`
    ${ua.call(this, e)}
    <span slot="headline">${e.primary}</span>
    ${da(e)}
  ` : "";
}
function ua(e) {
	return e.id === "theme" ? D`
      <ha-icon
        slot="start"
        class="theme-color-default-icon"
        icon="mdi:palette"
      ></ha-icon>
    ` : D`
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
function da(e) {
	return e.isThemeColor ? D`
      <span
        slot="end"
        class="theme-source-badge theme-source-badge-theme"
        aria-label="Theme"
      >T</span>
    ` : e.isStandardFallback ? D`
        <span
          slot="end"
          class="theme-source-badge theme-source-badge-standard"
          aria-label="Standard"
        >S</span>
      ` : "";
}
function fa() {
	let e = [], t = /* @__PURE__ */ new Set();
	for (let n of So) {
		let r = ga.call(this, n);
		!r || t.has(r.id) || (t.add(r.id), e.push(r));
	}
	for (let n of ya.call(this)) {
		let r = ga.call(this, n);
		!r || t.has(r.id) || (t.add(r.id), e.push(r));
	}
	return e;
}
function pa() {
	let e = ha.call(this);
	if (this._themeColorItemsCache && this._themeColorItemsCacheKey === e) return this._themeColorItemsCache;
	let t = fa.call(this);
	return this._themeColorItemsCache = t, this._themeColorItemsCacheKey = e, t;
}
function ma() {
	let e = ha.call(this);
	if (this._themeColorItemsCacheKey === e || this._themeColorWarmupScheduled === e) return;
	this._themeColorWarmupScheduled = e;
	let t = () => {
		this._themeColorWarmupScheduled === e && (pa.call(this), this._themeColorWarmupScheduled = "");
	};
	if (window.requestIdleCallback) {
		window.requestIdleCallback(t, { timeout: 500 });
		return;
	}
	window.setTimeout(t, 0);
}
function ha() {
	return `${this?.hass?.locale?.language || this?.hass?.language || ""}|${this?.hass?.selectedTheme?.theme || this?.hass?.themes?.theme || ""}|${this?.hass?.themes?.darkMode ?? this?.hass?.selectedTheme?.dark ?? ""}|${ba.call(this)}`;
}
function ga(e) {
	let t = _a(typeof e == "string" ? { id: e } : e), n = Aa(t.id), r = n && ja(t.id), i = !r && (t.source === "theme" || Oa.call(this, t.id)), a = t.label ? q(this, t.label) : Ma.call(this, t.id);
	return {
		id: t.id,
		primary: a,
		secondary: n ? q(this, "Color") : q(this, "Theme"),
		sorting_label: a,
		isStandardFallback: r,
		isThemeColor: i,
		search_labels: {
			color: t.id,
			label: a,
			source: r ? "standard" : i ? "theme" : "color"
		}
	};
}
function _a(e) {
	return {
		...e,
		id: va(e.id),
		label: e.label || null
	};
}
function va(e) {
	if (!e) return "";
	let t = e.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, ""), n = t.startsWith("color-") ? t.slice(6) : t;
	return xo[n] || n;
}
function ya() {
	return xa.call(this).map((e) => wa(e)).filter(Ta).map((e) => ({
		id: e,
		source: "theme"
	})).sort((e, t) => Ma.call(this, e.id).localeCompare(Ma.call(this, t.id), this?.hass?.locale?.language || this?.hass?.language || void 0, { sensitivity: "base" }));
}
function ba() {
	return Sa.call(this).map(([e, t]) => `${e}:${t}`).join(",");
}
function xa() {
	return Sa.call(this).map(([e]) => e).sort();
}
function Sa() {
	let e = /* @__PURE__ */ new Set(), t = [], n = Ca.call(this);
	for (let [r, i] of Object.entries(n)) {
		let n = r.toLowerCase();
		Ea(n, i) && (e.has(n) || (e.add(n), t.push([n, i])));
	}
	return t.sort(([e], [t]) => e.localeCompare(t));
}
function Ca() {
	let e = this?.hass?.selectedTheme?.theme || this?.hass?.themes?.theme || "", t = e ? this?.hass?.themes?.themes?.[e] : null;
	if (!t) return {};
	let { modes: n, ...r } = t, i = this?.hass?.themes?.darkMode ?? this?.hass?.selectedTheme?.dark ?? !1 ? n?.dark : n?.light;
	return {
		...r,
		...i || {}
	};
}
function wa(e) {
	return e.startsWith("color-") ? e.slice(6) : e;
}
function Ta(e) {
	return !!e && !/^\d+$/.test(e);
}
function Ea(e, t) {
	return !e || !(e.startsWith("color-") || e.startsWith("google-") || e.endsWith("-color") || e.includes("-color-")) ? !1 : Da(t);
}
function Da(e) {
	let t = e == null ? "" : e.toString().trim();
	return t ? /^#[0-9a-f]{3,8}$/i.test(t) || /^(rgb|rgba|hsl|hsla)\(/i.test(t) || /^var\(\s*--[a-z0-9-_]*color[a-z0-9-_]*/i.test(t) || /^\d+\s*,\s*\d+\s*,\s*\d+/.test(t) : !1;
}
function Oa(e) {
	let t = new Set(xa.call(this));
	return ka(e).some((e) => t.has(e));
}
function ka(e) {
	let t = va(e);
	if (!t) return [];
	let n = t.startsWith("color-") ? t : `color-${t}`;
	return t.endsWith("-color") ? [t, n] : [n, t];
}
function Aa(e) {
	return e === "theme" || e === "primary-color" || e === "accent-color" || dt(e);
}
function ja(e) {
	return dt(e) && !ft(e);
}
function Ma(e) {
	return e === "theme" ? q(this, "State color (default)") : e === "light" ? q(this, "State Light color") : e === "primary-color" ? q(this, "Primary") : e === "primary-text-color" ? q(this, "Primary text color") : e === "card-background-color" ? q(this, "Card background") : e === "secondary-background-color" ? q(this, "Secondary background color") : e === "accent-color" ? q(this, "Accent") : e.replaceAll("-", " ").replace(/\b\w/g, (e) => e.toUpperCase());
}
function Na(e) {
	let t = e?.toString().trim();
	return t && Pa(t) ? "picker" : "theme";
}
function Pa(e) {
	let t = e?.toString().trim().toLowerCase();
	return !!(t && (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl")));
}
function J({ interactions: e = [], title: t = "Interactions", expanded: n = !1, context: r = {}, config: i = this._config, onChange: a } = {}) {
	let o = e.filter(Boolean);
	if (!o.length) return "";
	let s = o.filter((e) => Fa(i, e)), c = o.filter((e) => !s.includes(e)), l = [{
		name: "interactions",
		type: "expandable",
		flatten: !0,
		expanded: n,
		icon: "mdi:gesture-tap-button",
		schema: [...s.map((e) => Ia(e, r)), {
			name: "",
			type: "optional_actions",
			flatten: !0,
			schema: c.map((e) => Ia(e, r))
		}]
	}], u = La(i, o);
	return D`
    <ha-form
      class="interactions-form"
      .hass=${this.hass}
      .data=${u}
      .schema=${l}
      .computeLabel=${(e) => za(this, e, o, t)}
      @value-changed=${(e) => {
		e.stopPropagation();
		let t = Ra(e.detail.value || {}, o, i);
		a ? a(t) : this._updateConfig(t), this.requestUpdate?.();
	}}
    ></ha-form>
  `;
}
function Fa(e = {}, t) {
	return t.defaultVisible && !Va(e?.[t.key]);
}
function Ia(e, t) {
	let n = Ba(e.defaultAction);
	return {
		name: e.formKey || e.key,
		selector: { ui_action: {
			actions: Ha(n),
			default_action: n
		} },
		...t ? { context: t } : {}
	};
}
function La(e = {}, t) {
	return t.reduce((t, n) => {
		let r = n.formKey || n.key, i = e?.[n.key] || (n.displayDefaultValue ? Ua(n.defaultAction) : void 0);
		return i && typeof i == "object" && i.action !== "popup" && (!Va(i) || Ba(n.defaultAction) !== "none") && (t[r] = Wa(i)), t;
	}, {});
}
function Ra(e, t, n = {}) {
	return t.reduce((t, r) => {
		let i = r.formKey || r.key, a = Ga(e[i], r.defaultAction);
		return t[r.key] = n?.[r.key]?.action === "popup" && !(i in e) ? n[r.key] : a, t;
	}, {});
}
function za(e, t, n, r) {
	return t.name === "interactions" ? q(e, r) : q(e, n.find((e) => (e.formKey || e.key) === t.name)?.label || t.name);
}
function Ba(e) {
	let t = typeof e == "string" ? e : e?.action || "none";
	return t === "call-service" ? "perform-action" : t;
}
function Va(e) {
	return e?.action === "none";
}
function Ha(e) {
	let t = [
		"more-info",
		"toggle",
		"navigate",
		"url",
		"perform-action",
		"assist"
	];
	return e === "none" ? t : [...t, "none"];
}
function Ua(e) {
	return typeof e == "string" ? { action: e } : e || { action: "none" };
}
function Wa(e) {
	if (!e || typeof e != "object") return e;
	let t = e.action === "call-service" ? "perform-action" : e.action;
	if (t !== "perform-action") return {
		...e,
		action: t
	};
	let n = {
		...e,
		action: t,
		perform_action: e.perform_action || e.service || ""
	};
	return e.service_data && !e.data && (n.data = e.service_data), delete n.service, delete n.service_data, n;
}
function Ga(e, t) {
	if (!(!e || typeof e != "object") && !(e.action === "none" && Ba(t) === "none")) {
		if (e.action === "perform-action") {
			let t = {
				...e,
				action: "call-service",
				service: e.perform_action || e.service || ""
			};
			return e.data && !e.service_data && (t.service_data = e.data), delete t.perform_action, delete t.data, Ka(t);
		}
		return Ka(e);
	}
}
function Ka(e) {
	let t = e?.action === "perform-action" ? "call-service" : e?.action || "none", n = { action: t };
	return t === "navigate" ? (n.navigation_path = e.navigation_path || "", n) : t === "call-service" ? (n.service = e.service || e.perform_action || "", (e.service_data || e.data) && (n.service_data = { ...e.service_data || e.data }), e.target && (n.target = { ...e.target }), n) : t === "url" ? (n.url_path = e.url_path || "", n) : t === "popup" ? (n.popup_title = e.popup_title || "", n.popup_content = e.popup_content || "", e.style && (n.style = e.style), e.card_mod && (n.card_mod = e.card_mod), n) : n;
}
function qa({ value: e = "", includeDomains: t, excludeDomains: n, multiple: r = !1, onValueChanged: i, filterOptions: a, activeFilter: o = "all", className: s = "entity-picker" } = {}) {
	let c = a?.length ? a.map((e) => ({
		...e,
		label: Ja.call(this, e)
	})) : null, l = c ? Xa(c) : t;
	return r ? D`
      <ha-selector
        class=${s}
        .hass=${this.hass}
        .selector=${{ entity: {
		...l?.length ? { filter: { domain: l } } : {},
		...n?.length ? { exclude_domains: n } : {},
		multiple: !0
	} }}
        .value=${e || ""}
        @value-changed=${(e) => i?.(e.detail.value || "")}
      ></ha-selector>
    ` : c?.length ? Za.call(this, {
		value: e,
		includeDomains: t,
		excludeDomains: n,
		filters: c,
		activeFilter: o,
		className: s,
		onValueChanged: i
	}) : D`
    <ha-entity-picker
      class=${s}
      .hass=${this.hass}
      .includeDomains=${l}
      .excludeDomains=${n}
      .value=${e || ""}
      @value-changed=${(e) => i?.(e.detail.value || "")}
    ></ha-entity-picker>
  `;
}
function Ja(e) {
	if (e.haDomains?.length) {
		let t = e.haDomains.map((e) => Ya(this?.hass, e)).filter(Boolean);
		if (t.length) return t.join(" / ");
	}
	return q(this, e.label);
}
function Ya(e, t) {
	if (!e?.localize || !t) return null;
	let n = [`component.${t}.entity_component._.name_plural`, `component.${t}.entity_component._.name`];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
function Xa(e = []) {
	if (e.some((e) => e.value === "all" && (!e.domains || e.domains.length === 0))) return;
	let t = /* @__PURE__ */ new Set();
	return e.forEach((e) => e.domains?.forEach((e) => t.add(e))), [...t];
}
function Za({ value: e, includeDomains: t, excludeDomains: n, filters: r, activeFilter: i, className: a, onValueChanged: o }) {
	co();
	let s = r.map((e) => ({
		id: e.value,
		label: e.label
	}));
	return D`
    <ha-generic-picker
      class=${a}
      .hass=${this.hass}
      .value=${e || ""}
      .placeholder=${"Entity"}
      .getItems=${(e, i) => Qa.call(this, {
		search: e,
		section: i,
		filters: r,
		includeDomains: t,
		excludeDomains: n
	})}
      .valueRenderer=${(e) => eo.call(this, e)}
      .rowRenderer=${to}
      .sections=${s}
      .selectedSection=${i || r[0]?.value || "all"}
      @picker-opened=${(e) => {
		e.currentTarget.__orbitSuppressSectionScroll = !0;
	}}
      @value-changed=${(e) => o?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}
function Qa({ search: e, section: t, filters: n, includeDomains: r, excludeDomains: i }) {
	let a = n.find((e) => e.value === (t || "all"))?.domains, o = a?.length ? a : r, s = new Set(i || []), c = (e || "").trim().toLowerCase();
	return Object.values(this.hass?.states || {}).filter((e) => {
		let t = oo(e.entity_id);
		return o?.length && !o.includes(t) ? !1 : !s.has(t);
	}).map((e) => $a.call(this, e)).filter((e) => no(e, c)).sort(ro);
}
function $a(e) {
	let t = io(e), n = oo(e.entity_id), r = ao(this.hass, e);
	return {
		id: e.entity_id,
		primary: t,
		secondary: r,
		sorting_label: `${t}_${e.entity_id}`,
		stateObj: e,
		domain: n,
		domainLabel: so(n),
		searchText: [
			t,
			e.entity_id,
			n,
			so(n),
			r,
			e.attributes?.device_class
		].filter(Boolean).join(" ").toLowerCase()
	};
}
function eo(e) {
	let t = this.hass?.states?.[e], n = t ? io(t) : e, r = t ? ao(this.hass, t) : void 0;
	return D`
    ${t ? D`<state-badge slot="start" .stateObj=${t}></state-badge>` : ""}
    <span slot="headline">${n}</span>
    ${r ? D`<span slot="supporting-text">${r}</span>` : ""}
  `;
}
function to(e, t) {
	return D`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${t !== 0}
    >
      <state-badge slot="start" .stateObj=${e.stateObj}></state-badge>
      <span slot="headline">${e.primary}</span>
      ${e.secondary ? D`<span slot="supporting-text">${e.secondary}</span>` : ""}
      <div slot="trailing-supporting-text" class="domain">
        ${e.domainLabel}
      </div>
    </ha-combo-box-item>
  `;
}
function no(e, t) {
	return t ? t.split(/\s+/).every((t) => e.searchText.includes(t)) : !0;
}
function ro(e, t) {
	return e.sorting_label.localeCompare(t.sorting_label, void 0, { sensitivity: "base" });
}
function io(e) {
	return e.attributes?.friendly_name || e.entity_id;
}
function ao(e, t) {
	let n = e?.entities?.[t.entity_id], r = n?.device_id ? e?.devices?.[n.device_id] : void 0, i = n?.area_id || r?.area_id || t.attributes?.area_id;
	return i ? e?.areas?.[i]?.name : void 0;
}
function oo(e = "") {
	return e.split(".")[0] || "";
}
function so(e = "") {
	return e.split("_").filter(Boolean).map((e) => e[0]?.toUpperCase() + e.slice(1)).join(" ");
}
function co() {
	if (Co) return;
	let e = Element.prototype.scrollIntoView;
	Element.prototype.scrollIntoView = function(...t) {
		if (uo(this)) {
			lo(this);
			return;
		}
		return e.apply(this, t);
	}, Co = !0;
}
function lo(e) {
	let t = e;
	for (; t;) {
		if (t.tagName?.toLowerCase?.() === "lit-virtualizer") {
			t.scrollTop = 0;
			return;
		}
		let e = t.getRootNode?.();
		if (e?.host && e.host !== t) {
			t = e.host;
			continue;
		}
		t = t.parentNode || t.host;
	}
}
function uo(e) {
	let t = e;
	for (; t;) {
		if (t.__orbitSuppressSectionScroll) return !0;
		let e = t.getRootNode?.();
		if (e?.host && e.host !== t) {
			t = e.host;
			continue;
		}
		t = t.parentNode || t.host;
	}
	return !1;
}
function fo({ value: e = "", onValueChanged: t, className: n = "entity-picker" } = {}) {
	return D`
    <ha-generic-picker
      class=${n}
      .hass=${this.hass}
      .value=${e || ""}
      .placeholder=${"Area"}
      .getItems=${() => po.call(this)}
      .valueRenderer=${(e) => ho.call(this, e)}
      .rowRenderer=${go}
      @value-changed=${(e) => t?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}
function po() {
	return Object.values(this.hass?.areas || {}).map((e) => mo.call(this, e)).sort(vo);
}
function mo(e) {
	let t = e.name || e.area_id, n = _o(this.hass, e);
	return {
		id: e.area_id,
		primary: t,
		secondary: n,
		sorting_label: t,
		icon: e.icon || "mdi:texture-box"
	};
}
function ho(e) {
	let t = this.hass?.areas?.[e], n = t ? mo.call(this, t) : {
		id: e,
		primary: e,
		icon: "mdi:texture-box"
	};
	return D`
    <ha-icon slot="start" .icon=${n.icon}></ha-icon>
    <span slot="headline">${n.primary}</span>
    ${n.secondary ? D`<span slot="supporting-text">${n.secondary}</span>` : ""}
  `;
}
function go(e, t) {
	return D`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${t !== 0}
    >
      <ha-icon slot="start" .icon=${e.icon}></ha-icon>
      <span slot="headline">${e.primary}</span>
      ${e.secondary ? D`<span slot="supporting-text">${e.secondary}</span>` : ""}
    </ha-combo-box-item>
  `;
}
function _o(e, t) {
	let n = t.floor_id;
	return n ? e?.floors?.[n]?.name : void 0;
}
function vo(e, t) {
	return e.sorting_label.localeCompare(t.sorting_label, void 0, { sensitivity: "base" });
}
function yo(e, t, n) {
	return D`
    <div class="field">
      <label>${q(this, e, n)}</label>

      ${qa.call(this, {
		value: this._config?.[t] || "",
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
    </div>
  `;
}
function bo(e, t) {
	return D`
    <div class="field">
      ${fo.call(this, {
		value: this._config?.[t] || "",
		onValueChanged: (e) => this._handleConfigUpdate ? this._handleConfigUpdate(t, e) : this._updateConfig({ [t]: e })
	})}
    </div>
  `;
}
var xo, So, Co, Y = e((() => {
	M(), L(), xo = {
		bluegrey: "blue-grey",
		darkgrey: "dark-grey",
		deeporange: "deep-orange",
		deeppurple: "deep-purple",
		lightblue: "light-blue",
		lightgreen: "light-green",
		lightgrey: "light-grey"
	}, So = [
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
		"state-inactive-color",
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
	], Co = !1;
}));
//#endregion
//#region src/common/editor/helpers/helpers.js
function wo(e) {
	e._editorPopoverCloseHandler || (e._editorPopoverCloseHandler = (t) => {
		!e._iconPickerKey && !e._colorPickerKey || Eo(t.composedPath?.() || []) || (e._iconPickerKey = "", e._colorPickerKey = "", e._iconFilePickerOpen = !1, e._iconFileSearch = "", e._themeColorPickerOpen = !1, e._themeColorSearch = "", e.requestUpdate?.());
	}, document.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.addEventListener("pointerdown", e._editorPopoverCloseHandler, !0));
}
function To(e) {
	e._editorPopoverCloseHandler &&= (document.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), e.removeEventListener("pointerdown", e._editorPopoverCloseHandler, !0), null);
}
function Eo(e) {
	return e.some((e) => {
		let t = e?.classList, n = e?.tagName?.toLowerCase?.();
		return t?.contains("icon-popover") || t?.contains("color-popover") || t?.contains("icon-preview") || t?.contains("color-preview") || t?.contains("color-control-button") || t?.contains("mdc-menu-surface") || n === "ha-generic-picker" || n === "ha-icon-picker" || n === "ha-combo-box" || n === "ha-combo-box-item" || n === "mwc-list" || n === "mwc-list-item";
	});
}
function Do(e) {
	if (!e) return "background-color: rgb(var(--color-theme));";
	let t = e.toString().trim().toLowerCase();
	if (t.startsWith("#") || t.startsWith("rgb(") || t.startsWith("hsl(")) return `background-color:${t};`;
	let n = t.replace(/[^a-z0-9-_]/g, "");
	return n ? `background-color: ${ut(n)};` : "background-color: rgb(var(--color-theme));";
}
function Oo(e) {
	let t = e?.toString().trim();
	return t && (Mo(t) || No(t) || ko(t)) || "#ffffff";
}
function ko(e, t = /* @__PURE__ */ new Set()) {
	let n = e?.toString().trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
	if (!n || t.has(n)) return "";
	t.add(n);
	let r = pt(n), i = ft(n) ? jo(r) : "", a = dt(n) ? jo(`${n}-color`) : "", o = jo(n), s = n.startsWith("color-") ? "" : jo(`color-${n}`);
	return Ao(i, t) || Ao(a, t) || Ao(o, t) || Ao(s, t) || "";
}
function Ao(e, t) {
	let n = e?.trim();
	if (!n) return "";
	let r = Mo(n);
	if (r) return r;
	let i = No(n);
	if (i) return i;
	let a = n.match(/^var\(\s*--([^),\s]+)\s*\)$/i);
	return a ? ko(a[1], t) : "";
}
function jo(e) {
	let t = `--${e}`, n = [document.documentElement, document.body].filter(Boolean);
	for (let e of n) {
		let n = getComputedStyle(e).getPropertyValue(t).trim();
		if (n) return n;
	}
	return "";
}
function Mo(e) {
	return /^#[0-9a-f]{6}$/i.test(e) ? e : /^#[0-9a-f]{3}$/i.test(e) ? `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}` : "";
}
function No(e) {
	let t = e.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
	if (t) return Po(Number(t[1]), Number(t[2]), Number(t[3]));
	let n = e.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/i);
	return n ? Po(Number(n[1]), Number(n[2]), Number(n[3])) : "";
}
function Po(e, t, n) {
	return `#${Fo(e)}${Fo(t)}${Fo(n)}`;
}
function Fo(e) {
	return Math.max(0, Math.min(255, e || 0)).toString(16).padStart(2, "0");
}
var Io = e((() => {
	M(), Wi(), Dn(), L(), Zi(), ea(), Y();
}));
//#endregion
//#region src/common/editor/helpers/name-picker.js
function Lo({ label: e = "Name", valueKey: t, legacyValueKey: n = "", entityKey: r = "main_entity", areaKey: i = "area", defaultType: a = "", modeKey: o = t } = {}) {
	return Ro.call(this), customElements.get("ha-entity-name-picker") ? D`
    <div class="field name-picker-field">
      <ha-entity-name-picker
        .hass=${this.hass}
        .label=${this._t(e)}
        .entityId=${is.call(this, {
		entityKey: r,
		areaKey: i
	})}
        .value=${Zo(this._config, {
		valueKey: t,
		legacyValueKey: n,
		entityKey: r,
		areaKey: i,
		defaultType: a
	})}
        @value-changed=${(e) => {
		e.stopPropagation(), es.call(this, {
			valueKey: t,
			legacyValueKey: n,
			value: ts(e.detail.value, this._config, {
				entityKey: r,
				areaKey: i,
				defaultType: a
			})
		});
	}}
      ></ha-entity-name-picker>
    </div>
  ` : zo.call(this, {
		label: e,
		valueKey: t,
		entityKey: r,
		areaKey: i,
		defaultType: a,
		modeKey: o
	});
}
function Ro() {
	customElements.get("ha-entity-name-picker") || this._namePickerRenderQueued || (this._namePickerRenderQueued = !0, customElements.whenDefined("ha-entity-name-picker").then(() => {
		this._namePickerRenderQueued = !1, this.requestUpdate?.();
	}));
}
function zo(e) {
	let t = Wo(this._config, Go(this, e.modeKey), e);
	return D`
    <div class="field name-picker-field name-picker-fallback">
      <div class="field-header">
        <label>${this._t(e.label)}</label>

        <ha-selector
          class="editor-header-button-toggle name-picker-mode-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [{
		label: cs(this, "composed"),
		value: "composed"
	}, {
		label: cs(this, "custom"),
		value: "custom"
	}] } }}
          .value=${t}
          @value-changed=${(t) => {
		t.stopPropagation();
		let n = t.detail.value || "composed";
		if (Ko(this, e.modeKey, n), n === "composed") {
			es.call(this, {
				valueKey: e.valueKey,
				legacyValueKey: e.legacyValueKey,
				value: void 0
			});
			return;
		}
		if (typeof $o(this._config, e) != "string") {
			es.call(this, {
				valueKey: e.valueKey,
				legacyValueKey: e.legacyValueKey,
				value: void 0
			});
			return;
		}
		this.requestUpdate?.();
	}}
        ></ha-selector>
      </div>

      ${t === "custom" ? Bo.call(this, e) : Vo.call(this, e)}
    </div>
  `;
}
function Bo(e) {
	return D`
    <ha-selector
      class="name-picker-custom-input"
      .hass=${this.hass}
      .selector=${{ text: {} }}
      .value=${typeof $o(this._config, e) == "string" ? $o(this._config, e) : ""}
      @value-changed=${(t) => {
		t.stopPropagation(), es.call(this, {
			valueKey: e.valueKey,
			legacyValueKey: e.legacyValueKey,
			value: t.detail.value || void 0
		});
	}}
    ></ha-selector>
  `;
}
function Vo(e) {
	let t = qo(this._config, e), n = Yo.call(this, t, e);
	return D`
    <ha-generic-picker
      class="name-picker-composed-picker"
      .hass=${this.hass}
      .value=${""}
      .placeholder=${this._t(e.label)}
      .getItems=${() => n}
      allow-custom-value
      .customValueLabel=${ds(this)}
      .rowRenderer=${(e) => D`
        <ha-combo-box-item type="button" compact>
          <span slot="headline">${e.primary}</span>
          ${e.secondary ? D`<span slot="supporting-text">${e.secondary}</span>` : ""}
        </ha-combo-box-item>
      `}
      .noSort=${!0}
      .searchLabel=${us(this)}
      @value-changed=${(n) => {
		n.stopPropagation();
		let r = Xo(n.detail.value);
		r && (Ko(this, e.modeKey, "composed"), es.call(this, {
			valueKey: e.valueKey,
			legacyValueKey: e.legacyValueKey,
			value: ts([...t, r], this._config, e)
		}));
	}}
    >
      <div slot="field" class="name-picker-composed-field">
        ${t.map((n, r) => Ho.call(this, n, r, t, e))}

        <button
          type="button"
          class="name-picker-add-chip"
          @click=${(e) => Uo(e)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
          <span>${ls(this)}</span>
        </button>
      </div>
    </ha-generic-picker>
  `;
}
function Ho(e, t, n, r) {
	return D`
    <button
      type="button"
      class="name-picker-chip"
      @click=${(e) => Uo(e)}
    >
      <ha-icon icon="mdi:drag-horizontal-variant"></ha-icon>
      <span>${Jo.call(this, e)}</span>
      <ha-icon
        class="name-picker-chip-remove"
        icon="mdi:close"
        @click=${(e) => {
		e.preventDefault(), e.stopPropagation();
		let i = n.filter((e, n) => n !== t);
		es.call(this, {
			valueKey: r.valueKey,
			legacyValueKey: r.legacyValueKey,
			value: ts(i, this._config, r)
		});
	}}
      ></ha-icon>
    </button>
  `;
}
function Uo(e) {
	e.preventDefault(), e.stopPropagation(), e.currentTarget?.closest("ha-generic-picker")?.open?.();
}
function Wo(e = {}, t, n) {
	let r = $o(e, n);
	return typeof r == "string" ? "custom" : r ? "composed" : t || "composed";
}
function Go(e, t) {
	return e._namePickerModes?.[t];
}
function Ko(e, t, n) {
	e._namePickerModes = {
		...e._namePickerModes,
		[t]: n
	};
}
function qo(e = {}, t) {
	let n = Zo(e, t);
	return !n || typeof n == "string" ? [] : Array.isArray(n) ? n : [n];
}
function Jo(e) {
	return e ? e.type === "text" ? `"${e.text || ""}"` : e.type === "area" ? this._t("Area") : e.type === "entity" ? this._t("Entity") : fs(this, e.type) : "";
}
function Yo(e = [], t) {
	let n = [], r = new Set(e.filter((e) => e?.type && e.type !== "text").map((e) => e.type)), i = t.areaKey && this._config?.[t.areaKey] ? this.hass?.areas?.[this._config[t.areaKey]] : null, a = is.call(this, t), o = a ? this.hass?.states?.[a] : null;
	if (i && !r.has("area")) n.push({
		id: "area",
		primary: this._t("Area"),
		secondary: i.name || ""
	});
	else if (o && !r.has("area")) {
		let e = os(this.hass, o, "area");
		e && n.push({
			id: "area",
			primary: this._t("Area"),
			secondary: e
		});
	}
	if (o) {
		r.has("entity") || n.push({
			id: "entity",
			primary: this._t("Entity"),
			secondary: os(this.hass, o, "entity")
		});
		let e = os(this.hass, o, "device");
		e && !r.has("device") && n.push({
			id: "device",
			primary: fs(this, "device"),
			secondary: e
		});
		let i = ss(this.hass, this._config?.[t.areaKey]) || os(this.hass, o, "floor");
		i && !r.has("floor") && n.push({
			id: "floor",
			primary: fs(this, "floor"),
			secondary: i
		});
	}
	return n;
}
function Xo(e) {
	if (e) return [
		"area",
		"device",
		"entity",
		"floor"
	].includes(e) ? { type: e } : {
		type: "text",
		text: e
	};
}
function Zo(e = {}, t) {
	let n = $o(e, t);
	if (n !== void 0) return n;
	if (t.defaultType === "area" && e[t.areaKey]) return { type: "area" };
	if (t.defaultType === "entity" && (e[t.entityKey] || e.entity)) return { type: "entity" };
}
function Qo(e = {}, t) {
	return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0 && e[t] !== "";
}
function $o(e = {}, t) {
	if (Qo(e, t.valueKey)) return e[t.valueKey];
	if (t.legacyValueKey && Qo(e, t.legacyValueKey)) return e[t.legacyValueKey];
}
function es({ valueKey: e, legacyValueKey: t, value: n }) {
	if (t && typeof this._updateConfig == "function") {
		this._updateConfig({
			[e]: n,
			[t]: void 0
		});
		return;
	}
	this._handleConfigUpdate(e, n);
}
function ts(e, t = {}, n) {
	if (!(!e || Array.isArray(e) && e.length === 0) && !(n.defaultType && ns(t, n) && rs(e, n.defaultType))) return e;
}
function ns(e = {}, t) {
	return t.defaultType === "area" ? !!e[t.areaKey] : t.defaultType === "entity" ? !!(e[t.entityKey] || e.entity) : !1;
}
function rs(e, t) {
	let n = Array.isArray(e) ? e : [e];
	return n.length === 1 && n[0] && typeof n[0] == "object" && n[0].type === t;
}
function is(e) {
	return this._config?.[e.entityKey] || this._config?.entity || as(this.hass, this._config?.[e.areaKey]);
}
function as(e, t) {
	if (!e || !t) return "";
	let n = e.entities || {}, r = e.devices || {};
	for (let i of Object.keys(e.states || {})) {
		let e = n[i];
		if (e?.area_id === t || e?.device_id && r[e.device_id]?.area_id === t) return i;
	}
	return "";
}
function os(e, t, n) {
	return !t || typeof e?.formatEntityName != "function" ? n === "entity" && (t?.attributes?.friendly_name || t?.entity_id) || "" : e.formatEntityName(t, { type: n }) || "";
}
function ss(e, t) {
	let n = t && e?.areas?.[t] ? e.areas[t].floor_id : "";
	return n && e?.floors?.[n] && e.floors[n].name || "";
}
function cs(e, t) {
	let n = `ui.components.entity.entity-name-picker.mode_${t}`, r = e.hass?.localize?.(n);
	return r && r !== n ? r : t === "custom" ? e._t("Custom") : "Composed";
}
function ls(e) {
	let t = "ui.components.entity.entity-name-picker.add", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Add");
}
function us(e) {
	let t = "ui.components.entity.entity-name-picker.search", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Search");
}
function ds(e) {
	let t = "ui.components.entity.entity-name-picker.custom_name", n = e.hass?.localize?.(t);
	return n && n !== t ? n : e._t("Name");
}
function fs(e, t) {
	let n = `ui.components.entity.entity-name-picker.types.${t}`, r = e.hass?.localize?.(n);
	return r && r !== n ? r : t;
}
var ps = e((() => {
	M();
}));
//#endregion
//#region src/editors/area/sections/area.js
function ms() {
	return D`
    <div class="section">
      ${gs.call(this)}

      ${this._renderArea("Area", "area")}

      ${this._renderColor(["Accent", "Color"], "accent_color")}

      ${this._renderEntity("Main entity", "main_entity")}
      ${_s.call(this)}

      ${J.call(this, {
		interactions: [
			{
				key: "tap_action",
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: hs(this._config),
				defaultVisible: !0,
				displayDefaultValue: !0
			},
			{
				key: "hold_action",
				formKey: "hold_action",
				label: "Hold behavior",
				defaultAction: "none"
			},
			{
				key: "double_tap_action",
				formKey: "double_tap_action",
				label: "Double tap behavior",
				defaultAction: "none"
			},
			this._config?.main_entity ? {
				key: "main_entity_tap_action",
				formKey: "icon_tap_action",
				label: "Icon tap behavior",
				defaultAction: "more-info",
				defaultVisible: !0
			} : null,
			this._config?.main_entity ? {
				key: "main_entity_hold_action",
				formKey: "icon_hold_action",
				label: "Icon hold behavior",
				defaultAction: "none"
			} : null,
			this._config?.main_entity ? {
				key: "main_entity_double_tap_action",
				formKey: "icon_double_tap_action",
				label: "Icon double tap behavior",
				defaultAction: "none"
			} : null
		],
		context: {
			entity_id: this._config?.main_entity,
			area_id: this._config?.area
		}
	})}
    </div>
  `;
}
function hs(e = {}) {
	return {
		action: "navigate",
		navigation_path: e.tap_action?.navigation_path || e.navigate?.navigation_path || e.navigation_path || "/lovelace/home"
	};
}
function gs() {
	return Lo.call(this, {
		label: "Name",
		valueKey: "area_name",
		legacyValueKey: "room_name",
		entityKey: "main_entity",
		areaKey: "area",
		defaultType: "area"
	});
}
function _s() {
	return vi.call(this, {
		label: "Icon",
		sourceKey: "main_entity_icon_source",
		entityKey: "main_entity",
		areaKey: "area",
		allowArea: !0,
		customIconKeys: [
			"main_entity_icon",
			"main_entity_icon_on",
			"main_entity_icon_off"
		],
		renderCustom() {
			return D`
        ${this._renderIconInput("", "main_entity_icon")}

        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "main_entity_icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "main_entity_icon_off")}
        </div>
      `;
		}
	});
}
var vs = e((() => {
	M(), ps(), Y(), Wi();
}));
//#endregion
//#region src/editors/area/sections/buttons.js
function ys() {
	let e = this._selectedButtonIndex || 1;
	return D`
    <div class="section">
      ${bs.call(this, [
		1,
		2,
		3,
		4
	], e, (e) => {
		this._selectedButtonIndex = e;
	})}

      ${xs.call(this, e)}
    </div>
  `;
}
function bs(e, t, n) {
	return D`
    <div
      class="editor-segment-menu"
      style="--editor-segment-columns: 4;"
    >
      ${e.map((e) => D`
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
function xs(e) {
	let t = `button${e}`, n = this._areaButtonDomainFilter || "all";
	return D`
    <div class="sub-section selected-button-section">
      <div class="field">
        <label>${this._t("Entity")}</label>

        ${qa.call(this, {
		value: this._config?.[t] || "",
		filterOptions: Ss,
		activeFilter: n,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
      </div>

      <div class="color-pair">
        ${this._renderColor(["Active", "Color"], `${t}_on_color`, "theme")}
        ${this._renderColor(["Inactive", "Color"], `${t}_off_color`, "theme")}
      </div>

      ${vi.call(this, {
		label: "Icon",
		sourceKey: `${t}_icon_source`,
		entityKey: t,
		customIconKeys: [
			`${t}_icon`,
			`${t}_icon_on`,
			`${t}_icon_off`
		],
		renderCustom() {
			return D`
            ${this._renderIconInput("", `${t}_icon`)}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], `${t}_icon_on`)}
              ${this._renderIconInput(["Inactive", "Icon"], `${t}_icon_off`)}
            </div>
          `;
		}
	})}

      ${this._renderTemplateInput("State template", `${t}_state_template`)}

      ${J.call(this, {
		interactions: [
			{
				key: `${t}_tap_action`,
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: "toggle",
				defaultVisible: !0
			},
			{
				key: `${t}_hold_action`,
				formKey: "hold_action",
				label: "Hold behavior",
				defaultAction: "more-info"
			},
			{
				key: `${t}_double_tap_action`,
				formKey: "double_tap_action",
				label: "Double tap behavior",
				defaultAction: "none"
			}
		],
		context: {
			entity_id: this._config?.[t],
			area_id: this._config?.area
		}
	})}
    </div>
  `;
}
var Ss, Cs = e((() => {
	M(), Y(), Wi(), Ss = [
		{
			label: "All",
			value: "all",
			domains: null
		},
		{
			label: "Lights",
			haDomains: ["light"],
			value: "light",
			domains: ["light"]
		},
		{
			label: "Switches",
			haDomains: ["switch"],
			value: "switch",
			domains: ["switch"]
		}
	];
}));
//#endregion
//#region src/editors/area/sections/curve-buttons.js
function ws() {
	let e = this._selectedCurveButtonIndex || 1;
	return D`
    <div class="section">
      <label class="editor-toggle-row">
        <span>${this._t("Lock curve button positions")}</span>
        <ha-switch
          .checked=${!!this._config?.curve_buttons_lock_position}
          @change=${(e) => this._updateConfig({ curve_buttons_lock_position: e.target.checked })}
        ></ha-switch>
      </label>

      <div class="curve-divider"></div>

      ${Es.call(this, [
		1,
		2,
		3,
		4,
		5,
		6
	], e, (e) => {
		this._selectedCurveButtonIndex = e;
	})}

      ${Ds.call(this, `curve_button${e}`, "", "more-info", { index: e }, {
		showColors: !0,
		filteredEntity: !0,
		filterKey: "_areaCurveButtonDomainFilter",
		filters: js
	})}
    </div>
  `;
}
function Ts() {
	let e = Hn(this._config?.action_button);
	return D`
    <div class="section">
      ${Ds.call(this, "action_button", "", e, {}, {
		showColors: !0,
		filteredEntity: !0
	})}
    </div>
  `;
}
function Es(e, t, n) {
	return D`
    <div class="editor-segment-menu">
      ${e.map((e) => D`
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
function Ds(e, t, n, r = {}, i = {}) {
	let a = this._config?.[e];
	return D`
    <div class="sub-section selected-button-section">
      ${t ? D`
            <div class="sub-section-title">
              ${this._t(t, r)}
            </div>
          ` : ""}

      ${i.filteredEntity ? Os.call(this, "Entity", e, i) : this._renderEntity("Entity", e)}

      ${i.showColors ? D`
            <div class="color-pair">
              ${ks.call(this, ["Active", "Color"], `${e}_on_color`)}
              ${ks.call(this, ["Inactive", "Color"], `${e}_off_color`)}
            </div>
          ` : ""}

      ${vi.call(this, {
		label: "Icon",
		sourceKey: `${e}_icon_source`,
		entityKey: e,
		customIconKeys: [
			`${e}_icon`,
			`${e}_icon_on`,
			`${e}_icon_off`
		],
		renderCustom() {
			return D`
            ${this._renderIconInput("", `${e}_icon`)}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], `${e}_icon_on`)}
              ${this._renderIconInput(["Inactive", "Icon"], `${e}_icon_off`)}
            </div>
          `;
		}
	})}

      ${this._renderTemplateInput("State template", `${e}_state_template`)}

      ${J.call(this, {
		interactions: [
			{
				key: `${e}_tap_action`,
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: n,
				defaultVisible: !0
			},
			{
				key: `${e}_hold_action`,
				formKey: "hold_action",
				label: "Hold behavior",
				defaultAction: "none"
			},
			{
				key: `${e}_double_tap_action`,
				formKey: "double_tap_action",
				label: "Double tap behavior",
				defaultAction: "none"
			}
		],
		context: {
			entity_id: a,
			area_id: this._config?.area
		}
	})}
    </div>
  `;
}
function Os(e, t, n = {}) {
	let r = this[n.filterKey || "_areaActionButtonDomainFilter"] || "all", i = n.filters || As;
	return D`
    <div class="field">
      <label>${this._t(e)}</label>

      ${qa.call(this, {
		value: this._config?.[t] || "",
		filterOptions: i,
		activeFilter: r,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate(t, e) : this._handleConfigUpdate(t, e)
	})}
    </div>
  `;
}
function ks(e, t) {
	let n = this._config?.[t] || "", r = n === "theme" ? "" : n, i = r || this._config?.accent_color || "theme";
	return this._renderColorControl(e, t, r, (e) => this._handleConfigUpdate(t, e), i);
}
var As, js, Ms = e((() => {
	M(), Y(), Wi(), Gn(), As = [
		{
			label: "All",
			value: "all",
			domains: null
		},
		{
			label: "Automations",
			haDomains: ["automation"],
			value: "automation",
			domains: ["automation"]
		},
		{
			label: "Buttons",
			haDomains: ["button"],
			value: "button",
			domains: [
				"button",
				"input_button",
				"input_boolean"
			]
		},
		{
			label: "Cameras",
			haDomains: ["camera"],
			value: "camera",
			domains: ["camera"]
		},
		{
			label: "Scenes",
			haDomains: ["scene"],
			value: "scene",
			domains: ["scene"]
		},
		{
			label: "Scripts",
			haDomains: ["script"],
			value: "script",
			domains: ["script"]
		}
	], js = [
		{
			label: "All",
			value: "all",
			domains: null
		},
		{
			label: "Covers",
			haDomains: ["cover"],
			value: "cover",
			domains: ["cover"]
		},
		{
			label: "Lights",
			haDomains: ["light"],
			value: "light",
			domains: ["light"]
		},
		{
			label: "Sensors",
			haDomains: ["sensor"],
			value: "sensor",
			domains: ["sensor", "binary_sensor"]
		},
		{
			label: "Switches",
			haDomains: ["switch"],
			value: "switch",
			domains: ["switch"]
		}
	];
})), Ns, Ps = e((() => {
	M(), Ns = c`
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
}
`;
})), Fs, Is = e((() => {
	M(), Fs = c`
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
})), Ls, Rs = e((() => {
	M(), Ls = c`
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
})), zs, Bs = e((() => {
	M(), zs = c`
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

.field-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.field-header > label {
  color: var(--primary-text-color);
  font-size: var(--ha-font-size-m, 14px);
  font-weight: var(--ha-font-weight-medium, 500);
  line-height: var(--ha-line-height-condensed, 20px);
}

.editor-header-button-toggle,
.main-entity-icon-source-selector,
.name-picker-mode-selector {
  flex: 0 1 auto;
  width: auto;
  max-width: 100%;
}

.editor-button-toggle-field .field-header,
.main-entity-icon-source-field .field-header,
.name-picker-fallback .field-header {
  min-height: 40px;
}

.name-picker-field ha-entity-name-picker,
.name-picker-custom-input,
.name-picker-composed-picker {
  display: block;
  width: 100%;
}

.name-picker-composed-picker {
  --ha-generic-picker-width: min(720px, calc(100vw - 48px));
  --ha-generic-picker-max-width: min(720px, calc(100vw - 48px));
}

.name-picker-composed-field {
  min-height: 56px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 12px 24px;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid var(--input-ink-color, var(--secondary-text-color));
  background: var(--orbit-editor-control);
  box-sizing: border-box;
}

.name-picker-composed-field:focus-within {
  border-bottom-color: var(--primary-color);
  box-shadow: inset 0 -1px 0 var(--primary-color);
}

.name-picker-chip,
.name-picker-add-chip {
  min-height: 32px;
  border: 1px solid var(--orbit-editor-border);
  border-radius: var(--ha-border-radius-pill, 999px);
  background: color-mix(
    in srgb,
    var(--primary-text-color) 10%,
    transparent
  );
  color: var(--primary-text-color);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  font: inherit;
  font-size: var(--ha-font-size-m, 14px);
  line-height: var(--ha-line-height-normal, 20px);
  cursor: pointer;
}

.name-picker-add-chip {
  background: transparent;
}

.name-picker-chip ha-icon,
.name-picker-add-chip ha-icon {
  --mdc-icon-size: 18px;
  color: var(--secondary-text-color);
}

.name-picker-chip-remove {
  margin-right: -4px;
}

.color-pair,
.selector-pair,
.icon-pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.status-settings-row .status-separator-field {
  padding-top: 44px;
}

@media (max-width: 640px) {
  .color-pair,
  .selector-pair,
  .icon-pair {
    grid-template-columns: 1fr;
  }

  .status-settings-row .status-separator-field {
    padding-top: 0;
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
select,
ha-selector {
  width: 100%;
}

ha-selector {
  display: block;
}

input,
select {
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
})), Vs, Hs = e((() => {
	M(), Vs = c`
.entity-picker {
  width: 100%;
  display: block;
}

.entity-picker::part(root),
.entity-picker * {
  box-sizing: border-box;
}

`;
})), Us, Ws = e((() => {
	M(), Us = c`
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

.native-color-picker-field {
  position: relative;
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border: 0;
  border-bottom: 1px solid var(--input-ink-color, var(--secondary-text-color));
  border-radius: 4px 4px 0 0;
  background: var(--orbit-editor-control);
  color: inherit;
  cursor: pointer;
  box-sizing: border-box;
}

.native-color-picker-field:focus-within {
  border-bottom-color: var(--primary-color);
  box-shadow: inset 0 -1px 0 var(--primary-color);
}

.native-color-picker-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  border: 0;
  cursor: pointer;
  z-index: 1;
}

.native-color-picker-swatch {
  position: relative;
  z-index: 2;
  display: block;
  width: 20px;
  height: 20px;
  border-radius: var(--ha-border-radius-pill, 999px);
  border: 1px solid var(--outline-color, var(--divider-color));
  box-sizing: border-box;
  pointer-events: none;
}

.native-color-picker-empty-swatch {
  position: relative;
  z-index: 2;
  display: block;
  width: 20px;
  height: 20px;
  pointer-events: none;
}

.native-color-picker-text {
  position: relative;
  z-index: 2;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  pointer-events: none;
}

.native-color-picker-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ha-font-size-m, 14px);
  line-height: var(--ha-line-height-normal, 20px);
  color: var(--secondary-text-color);
}

.native-color-picker-value {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ha-font-size-m, 14px);
  line-height: var(--ha-line-height-normal, 20px);
  letter-spacing: 0;
}

.native-color-picker-value.empty {
  min-height: 20px;
}

.native-color-picker-clear {
  position: relative;
  z-index: 3;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 -8px 0 0;
  padding: 0;
  border: 0;
  border-radius: var(--ha-border-radius-pill, 999px);
  background: transparent;
  color: var(--secondary-text-color);
  cursor: pointer;
}

.native-color-picker-clear:hover,
.native-color-picker-clear:focus {
  background: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  color: var(--primary-text-color);
  outline: none;
}

.native-color-picker-clear ha-icon {
  --mdc-icon-size: 22px;
}

.native-color-picker-arrow {
  position: relative;
  z-index: 2;
  --mdc-icon-size: 20px;
  color: var(--secondary-text-color);
  pointer-events: none;
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

.theme-source-badge-theme {
  background: var(--accent-color, var(--primary-color));
}

.theme-source-badge-standard {
  background: var(--primary-color);
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
})), Gs, Ks = e((() => {
	M(), Gs = c`
.action-field {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.interactions-form {
  display: block;
  margin-top: 16px;
}

.interactions-form ha-form {
  display: block;
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
})), qs, Js = e((() => {
	M(), qs = c`
.editor-version {
  padding: 0 14px;
  font-size: var(--ha-font-size-xs, 11px);
  font-weight: var(--ha-font-weight-normal, 400);
  line-height: var(--ha-line-height-condensed, 18px);
  opacity: 0.5;
  text-align: right;
}
`;
})), Ys, Xs = e((() => {
	M(), Ys = c`
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
})), Zs, Qs = e((() => {
	Ps(), Is(), Rs(), Bs(), Hs(), Ws(), Ks(), Js(), Xs(), Zs = [
		Ns,
		Fs,
		Ls,
		zs,
		Vs,
		Us,
		Gs,
		qs,
		Ys
	];
})), $s, ec, tc, nc, rc, ic, ac, oc, sc, cc, lc, uc, dc, fc, pc, mc, hc, gc, _c = e((() => {
	$s = "Cards", ec = "Dynamic", tc = "Equal", nc = "Files", rc = "Separator", ic = "Main", ac = "Overlay", oc = "Crop", sc = "Resize", cc = "Position", lc = "Width", uc = "Height", dc = "Right", fc = "Bottom", pc = "Left", mc = "Background", hc = "Tabs", gc = {
		"Accent color": "Accent color",
		"Action button": "Action button",
		"Actions per row": "Actions per row",
		"Add a card to start.": "Add a card to start.",
		"Battery entity {index}": "Battery entity {index}",
		"Button {index}": "Button {index}",
		Cards: $s,
		"Choose color": "Choose color",
		"Choose icon": "Choose icon",
		"Curve buttons": "Curve buttons",
		Dynamic: ec,
		"ETA entity": "ETA entity",
		Equal: tc,
		Files: nc,
		"Icon only": "Icon only",
		"Items per row": "Items per row",
		"Label template": "Label template",
		"Loading files...": "Loading files...",
		"Local Icons": "Local Icons",
		"Lock curve button positions": "Lock curve button positions",
		"Main entity": "Main entity",
		"Move left": "Move left",
		"Move right": "Move right",
		"Navigation path": "Navigation path",
		"Native active state color": "Native active state color",
		"Native inactive state color": "Native inactive state color",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
		"No matching actions": "No matching actions",
		"No matching colors": "No matching colors",
		"No matching files": "No matching files",
		"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
		"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
		"Orbit Icons": "Orbit Icons",
		"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
		"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}",
		"Orbit Status Badge (Dev) v{version}": "Orbit Status Badge (Dev) v{version}",
		"Person entity": "Person entity",
		"Separate cards": "Separate cards",
		Separator: rc,
		"State light color": "State light color",
		"State color (default)": "State color (default)",
		"State color": "State color",
		"State template": "State template",
		"Status {index}": "Status {index}",
		"Status color": "Status color",
		"Status name": "Status name",
		"Status sensors": "Status sensors",
		"Card background": "Card background",
		"Force padding": "Force padding",
		Main: ic,
		Overlay: ac,
		Crop: oc,
		Resize: sc,
		Position: cc,
		Width: lc,
		Height: uc,
		Top: "Top",
		"Transparent background": "Transparent background",
		Right: dc,
		Bottom: fc,
		Left: pc,
		"Primary text color": "Primary text color",
		"Secondary background color": "Secondary background color",
		Background: mc,
		"Tab font size": "Tab font size",
		"Tab width": "Tab width",
		Tabs: hc,
		"Tracker entity": "Tracker entity"
	};
})), vc, yc, bc, xc, Sc, Cc, wc, Tc, Ec, Dc, Oc, kc, Ac, jc, Mc, Nc, Pc, Fc, Ic = e((() => {
	vc = "Cards", yc = "Dynamic", bc = "Equal", xc = "Files", Sc = "Separator", Cc = "Main", wc = "Overlay", Tc = "Crop", Ec = "Resize", Dc = "Position", Oc = "Width", kc = "Height", Ac = "Right", jc = "Bottom", Mc = "Left", Nc = "Background", Pc = "Tabs", Fc = {
		"Accent color": "Accent colour",
		"Action button": "Action button",
		"Actions per row": "Actions per row",
		"Add a card to start.": "Add a card to start.",
		"Battery entity {index}": "Battery entity {index}",
		"Button {index}": "Button {index}",
		Cards: vc,
		"Choose color": "Choose colour",
		"Choose icon": "Choose icon",
		"Curve buttons": "Curve buttons",
		Dynamic: yc,
		"ETA entity": "ETA entity",
		Equal: bc,
		Files: xc,
		"Icon only": "Icon only",
		"Items per row": "Items per row",
		"Label template": "Label template",
		"Loading files...": "Loading files...",
		"Local Icons": "Local Icons",
		"Lock curve button positions": "Lock curve button positions",
		"Main entity": "Main entity",
		"Move left": "Move left",
		"Move right": "Move right",
		"Navigation path": "Navigation path",
		"Native active state color": "Native active state colour",
		"Native inactive state color": "Native inactive state colour",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.",
		"No matching actions": "No matching actions",
		"No matching colors": "No matching colours",
		"No matching files": "No matching files",
		"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
		"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
		"Orbit Icons": "Orbit Icons",
		"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
		"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}",
		"Person entity": "Person entity",
		"Separate cards": "Separate cards",
		Separator: Sc,
		"State light color": "State light colour",
		"State color (default)": "State colour (default)",
		"State color": "State colour",
		"State template": "State template",
		"Status {index}": "Status {index}",
		"Status color": "Status colour",
		"Status name": "Status name",
		"Status sensors": "Status sensors",
		"Card background": "Card background",
		"Force padding": "Force padding",
		Main: Cc,
		Overlay: wc,
		Crop: Tc,
		Resize: Ec,
		Position: Dc,
		Width: Oc,
		Height: kc,
		Top: "Top",
		"Transparent background": "Transparent background",
		Right: Ac,
		Bottom: jc,
		Left: Mc,
		"Primary text color": "Primary text colour",
		"Secondary background color": "Secondary background colour",
		Background: Nc,
		"Tab font size": "Tab font size",
		"Tab width": "Tab width",
		Tabs: Pc,
		"Tracker entity": "Tracker entity"
	};
})), Lc, Rc, zc, Bc, Vc, Hc, Uc, Wc, Gc, Kc, qc, Jc, Yc, Xc, Zc, Qc, $c, el, tl, nl = e((() => {
	Lc = "Karten", Rc = "Dynamisch", zc = "Gleich", Bc = "Dateien", Vc = "Trennzeichen", Hc = "Hauptkarte", Uc = "Überlagerung", Wc = "Zuschneiden", Gc = "Größe ändern", Kc = "Position", qc = "Breite", Jc = "Höhe", Yc = "Oben", Xc = "Rechts", Zc = "Unten", Qc = "Links", $c = "Hintergrund", el = "Tabs", tl = {
		"Accent color": "Akzentfarbe",
		"Action button": "Aktionstaste",
		"Actions per row": "Aktionen pro Zeile",
		"Add a card to start.": "Füge eine Karte hinzu, um zu beginnen.",
		"Battery entity {index}": "Batterie-Entität {index}",
		"Button {index}": "Taste {index}",
		Cards: Lc,
		"Choose color": "Farbe auswählen",
		"Choose icon": "Symbol auswählen",
		"Curve buttons": "Bogen-Tasten",
		Dynamic: Rc,
		"ETA entity": "ETA-Entität",
		Equal: zc,
		Files: Bc,
		"Icon only": "Nur Symbol",
		"Items per row": "Elemente pro Zeile",
		"Label template": "Beschriftungsvorlage",
		"Loading files...": "Dateien werden geladen...",
		"Local Icons": "Lokale Symbole",
		"Lock curve button positions": "Bogen-Tastenpositionen sperren",
		"Main entity": "Hauptentität",
		"Move left": "Nach links verschieben",
		"Move right": "Nach rechts verschieben",
		"Navigation path": "Navigationspfad",
		"No matching colors": "Keine passenden Farben",
		"No matching actions": "Keine passenden Aktionen",
		"No matching files": "Keine passenden Dateien",
		"Person entity": "Personen-Entität",
		"Separate cards": "Separate Karten",
		Separator: Vc,
		"State light color": "Lichtstatusfarbe",
		"State color (default)": "Statusfarbe (Standard)",
		"State template": "Zustandsvorlage",
		"Status {index}": "Status {index}",
		"Status color": "Statusfarbe",
		"Status name": "Statusname",
		"Status sensors": "Statussensoren",
		"Card background": "Kartenhintergrund",
		"Force padding": "Padding erzwingen",
		Main: Hc,
		Overlay: Uc,
		Crop: Wc,
		Resize: Gc,
		Position: Kc,
		Width: qc,
		Height: Jc,
		Top: Yc,
		"Transparent background": "Transparenter Hintergrund",
		Right: Xc,
		Bottom: Zc,
		Left: Qc,
		"Primary text color": "Primäre Textfarbe",
		"Secondary background color": "Sekundäre Hintergrundfarbe",
		Background: $c,
		"Tab font size": "Tab-Schriftgröße",
		"Tab width": "Tab-Breite",
		Tabs: el,
		"Tracker entity": "Tracker-Entität",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Keine Dateien gefunden. Füge ein lokales Symbolmanifest unter /local/icons/manifest.json hinzu oder gib den Dateinamen manuell ein.",
		"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
		"Orbit Icons": "Orbit-Symbole",
		"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
		"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
		"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}"
	};
})), rl, il, al, ol, sl, cl, ll, ul, dl, fl, pl, ml, hl, gl, _l, vl, yl, bl, xl, Sl = e((() => {
	rl = "Tarjetas", il = "Dinámico", al = "Igual", ol = "Archivos", sl = "Separador", cl = "Principal", ll = "Superposición", ul = "Recortar", dl = "Redimensionar", fl = "Posición", pl = "Ancho", ml = "Alto", hl = "Arriba", gl = "Derecha", _l = "Abajo", vl = "Izquierda", yl = "Fondo", bl = "Pestañas", xl = {
		"Accent color": "Color de acento",
		"Action button": "Botón de acción",
		"Actions per row": "Acciones por fila",
		"Add a card to start.": "Añade una tarjeta para empezar.",
		"Battery entity {index}": "Entidad de batería {index}",
		"Button {index}": "Botón {index}",
		Cards: rl,
		"Choose color": "Elegir color",
		"Choose icon": "Elegir icono",
		"Curve buttons": "Botones curvos",
		Dynamic: il,
		"ETA entity": "Entidad ETA",
		Equal: al,
		Files: ol,
		"Icon only": "Solo icono",
		"Items per row": "Elementos por fila",
		"Label template": "Plantilla de etiqueta",
		"Loading files...": "Cargando archivos...",
		"Local Icons": "Iconos locales",
		"Lock curve button positions": "Bloquear posiciones de botones curvos",
		"Main entity": "Entidad principal",
		"Move left": "Mover a la izquierda",
		"Move right": "Mover a la derecha",
		"Navigation path": "Ruta de navegación",
		"No matching colors": "No hay colores coincidentes",
		"No matching actions": "No hay acciones coincidentes",
		"No matching files": "No hay archivos coincidentes",
		"Person entity": "Entidad de persona",
		"Separate cards": "Tarjetas separadas",
		Separator: sl,
		"State light color": "Color de luz de estado",
		"State color (default)": "Color de estado (predeterminado)",
		"State template": "Plantilla de estado",
		"Status {index}": "Estado {index}",
		"Status color": "Color de estado",
		"Status name": "Nombre de estado",
		"Status sensors": "Sensores de estado",
		"Card background": "Fondo de tarjeta",
		"Force padding": "Forzar relleno",
		Main: cl,
		Overlay: ll,
		Crop: ul,
		Resize: dl,
		Position: fl,
		Width: pl,
		Height: ml,
		Top: hl,
		"Transparent background": "Fondo transparente",
		Right: gl,
		Bottom: _l,
		Left: vl,
		"Primary text color": "Color de texto primario",
		"Secondary background color": "Color de fondo secundario",
		Background: yl,
		"Tab font size": "Tamaño de fuente de pestaña",
		"Tab width": "Ancho de pestaña",
		Tabs: bl,
		"Tracker entity": "Entidad de seguimiento",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "No se encontraron archivos. Añade un manifiesto de iconos local en /local/icons/manifest.json o escribe el nombre del archivo manualmente.",
		"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
		"Orbit Icons": "Iconos de Orbit",
		"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
		"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
		"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}"
	};
})), Cl, wl, Tl, El, Dl, Ol, kl, Al, jl, Ml, Nl, Pl, Fl, Il, Ll, Rl, zl, Bl, Vl = e((() => {
	Cl = "Cartes", wl = "Dynamique", Tl = "Égal", El = "Fichiers", Dl = "Séparateur", Ol = "Principal", kl = "Superposition", Al = "Recadrer", jl = "Redimensionner", Ml = "Position", Nl = "Largeur", Pl = "Hauteur", Fl = "Haut", Il = "Droite", Ll = "Gauche", Rl = "Arrière-plan", zl = "Onglets", Bl = {
		"Accent color": "Couleur d'accent",
		"Action button": "Bouton d'action",
		"Actions per row": "Actions par ligne",
		"Add a card to start.": "Ajoutez une carte pour commencer.",
		"Battery entity {index}": "Entité batterie {index}",
		"Button {index}": "Bouton {index}",
		Cards: Cl,
		"Choose color": "Choisir une couleur",
		"Choose icon": "Choisir une icône",
		"Curve buttons": "Boutons courbes",
		Dynamic: wl,
		"ETA entity": "Entité ETA",
		Equal: Tl,
		Files: El,
		"Icon only": "Icône seule",
		"Items per row": "Éléments par ligne",
		"Label template": "Modèle de libellé",
		"Loading files...": "Chargement des fichiers...",
		"Local Icons": "Icônes locales",
		"Lock curve button positions": "Verrouiller les positions des boutons courbes",
		"Main entity": "Entité principale",
		"Move left": "Déplacer à gauche",
		"Move right": "Déplacer à droite",
		"Navigation path": "Chemin de navigation",
		"No matching colors": "Aucune couleur correspondante",
		"No matching actions": "Aucune action correspondante",
		"No matching files": "Aucun fichier correspondant",
		"Person entity": "Entité personne",
		"Separate cards": "Cartes séparées",
		Separator: Dl,
		"State light color": "Couleur d’état de lumière",
		"State color (default)": "Couleur d’état (par défaut)",
		"State template": "Modèle d'état",
		"Status {index}": "Statut {index}",
		"Status color": "Couleur du statut",
		"Status name": "Nom du statut",
		"Status sensors": "Capteurs de statut",
		"Card background": "Arrière-plan de la carte",
		"Force padding": "Forcer le remplissage",
		Main: Ol,
		Overlay: kl,
		Crop: Al,
		Resize: jl,
		Position: Ml,
		Width: Nl,
		Height: Pl,
		Top: Fl,
		"Transparent background": "Arrière-plan transparent",
		Right: Il,
		Bottom: "Bas",
		Left: Ll,
		"Primary text color": "Couleur du texte principal",
		"Secondary background color": "Couleur d’arrière-plan secondaire",
		Background: Rl,
		"Tab font size": "Taille de police de l’onglet",
		"Tab width": "Largeur de l’onglet",
		Tabs: zl,
		"Tracker entity": "Entité de suivi",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Aucun fichier trouvé. Ajoutez un manifeste d’icônes local dans /local/icons/manifest.json ou saisissez le nom du fichier manuellement.",
		"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
		"Orbit Icons": "Icônes Orbit",
		"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
		"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
		"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}"
	};
})), Hl, Ul, Wl, Gl, Kl, ql, Jl, Yl, Xl, Zl, Ql, $l, eu, tu, nu, ru, iu, au, ou, su = e((() => {
	Hl = "Schede", Ul = "Dinamico", Wl = "Uguale", Gl = "File", Kl = "Separatore", ql = "Principale", Jl = "Sovrapposizione", Yl = "Ritaglia", Xl = "Ridimensiona", Zl = "Posizione", Ql = "Larghezza", $l = "Altezza", eu = "Alto", tu = "Destra", nu = "Basso", ru = "Sinistra", iu = "Sfondo", au = "Schede", ou = {
		"Accent color": "Colore accento",
		"Action button": "Pulsante azione",
		"Actions per row": "Azioni per riga",
		"Add a card to start.": "Aggiungi una scheda per iniziare.",
		"Battery entity {index}": "Entità batteria {index}",
		"Button {index}": "Pulsante {index}",
		Cards: Hl,
		"Choose color": "Scegli colore",
		"Choose icon": "Scegli icona",
		"Curve buttons": "Pulsanti curvi",
		Dynamic: Ul,
		"ETA entity": "Entità ETA",
		Equal: Wl,
		Files: Gl,
		"Icon only": "Solo icona",
		"Items per row": "Elementi per riga",
		"Label template": "Template etichetta",
		"Loading files...": "Caricamento file...",
		"Local Icons": "Icone locali",
		"Lock curve button positions": "Blocca posizioni dei pulsanti curvi",
		"Main entity": "Entità principale",
		"Move left": "Sposta a sinistra",
		"Move right": "Sposta a destra",
		"Navigation path": "Percorso navigazione",
		"No matching colors": "Nessun colore corrispondente",
		"No matching actions": "Nessuna azione corrispondente",
		"No matching files": "Nessun file corrispondente",
		"Person entity": "Entità persona",
		"Separate cards": "Schede separate",
		Separator: Kl,
		"State light color": "Colore stato luce",
		"State color (default)": "Colore stato (predefinito)",
		"State template": "Template stato",
		"Status {index}": "Stato {index}",
		"Status color": "Colore stato",
		"Status name": "Nome stato",
		"Status sensors": "Sensori stato",
		"Card background": "Sfondo scheda",
		"Force padding": "Forza padding",
		Main: ql,
		Overlay: Jl,
		Crop: Yl,
		Resize: Xl,
		Position: Zl,
		Width: Ql,
		Height: $l,
		Top: eu,
		"Transparent background": "Sfondo trasparente",
		Right: tu,
		Bottom: nu,
		Left: ru,
		"Primary text color": "Colore testo primario",
		"Secondary background color": "Colore sfondo secondario",
		Background: iu,
		"Tab font size": "Dimensione font scheda",
		"Tab width": "Larghezza scheda",
		Tabs: au,
		"Tracker entity": "Entità tracker",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Nessun file trovato. Aggiungi un manifesto icone locale in /local/icons/manifest.json oppure digita manualmente il nome del file.",
		"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
		"Orbit Icons": "Icone Orbit",
		"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
		"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
		"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}"
	};
})), cu, lu, uu, du, fu, pu, mu, hu, gu, _u, vu, yu, bu, xu, Su, Cu, wu, Tu, Eu, Du = e((() => {
	cu = "Kaarten", lu = "Dynamisch", uu = "Gelijk", du = "Bestanden", fu = "Scheidingsteken", pu = "Hoofdkaart", mu = "Overlay", hu = "Bijsnijden", gu = "Formaat wijzigen", _u = "Positie", vu = "Breedte", yu = "Hoogte", bu = "Boven", xu = "Rechts", Su = "Onder", Cu = "Links", wu = "Achtergrond", Tu = "Tabbladen", Eu = {
		"Accent color": "Accentkleur",
		"Action button": "Actieknop",
		"Actions per row": "Acties per rij",
		"Add a card to start.": "Voeg een kaart toe om te beginnen.",
		"Battery entity {index}": "Batterij-entiteit {index}",
		"Button {index}": "Knop {index}",
		Cards: cu,
		"Choose color": "Kleur kiezen",
		"Choose icon": "Icoon kiezen",
		"Curve buttons": "Gebogen knoppen",
		Dynamic: lu,
		"ETA entity": "ETA-entiteit",
		Equal: uu,
		Files: du,
		"Icon only": "Alleen icoon",
		"Items per row": "Items per rij",
		"Label template": "Labelsjabloon",
		"Loading files...": "Bestanden laden...",
		"Local Icons": "Lokale iconen",
		"Lock curve button positions": "Posities van gebogen knoppen vergrendelen",
		"Main entity": "Hoofdentiteit",
		"Move left": "Naar links verplaatsen",
		"Move right": "Naar rechts verplaatsen",
		"Navigation path": "Navigatiepad",
		"No matching colors": "Geen overeenkomende kleuren",
		"No matching actions": "Geen overeenkomende acties",
		"No matching files": "Geen overeenkomende bestanden",
		"Person entity": "Persoon-entiteit",
		"Separate cards": "Aparte kaarten",
		Separator: fu,
		"State light color": "Statuskleur licht",
		"State color (default)": "Statuskleur (standaard)",
		"State template": "Statussjabloon",
		"Status {index}": "Status {index}",
		"Status color": "Statuskleur",
		"Status name": "Statusnaam",
		"Status sensors": "Statussensoren",
		"Card background": "Kaartachtergrond",
		"Force padding": "Padding afdwingen",
		Main: pu,
		Overlay: mu,
		Crop: hu,
		Resize: gu,
		Position: _u,
		Width: vu,
		Height: yu,
		Top: bu,
		"Transparent background": "Transparante achtergrond",
		Right: xu,
		Bottom: Su,
		Left: Cu,
		"Primary text color": "Primaire tekstkleur",
		"Secondary background color": "Secundaire achtergrondkleur",
		Background: wu,
		"Tab font size": "Tabblad lettergrootte",
		"Tab width": "Tabbladbreedte",
		Tabs: Tu,
		"Tracker entity": "Tracker-entiteit",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Geen bestanden gevonden. Voeg een lokaal iconenmanifest toe op /local/icons/manifest.json of typ de bestandsnaam handmatig.",
		"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
		"Orbit Icons": "Orbit-iconen",
		"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
		"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
		"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}"
	};
})), Ou, ku, Au, ju, Mu, Nu, Pu, Fu, Iu, Lu, Ru, zu, Bu, Vu, Hu, Uu, Wu, Gu, Ku, qu = e((() => {
	Ou = "Cartões", ku = "Dinâmico", Au = "Igual", ju = "Arquivos", Mu = "Separador", Nu = "Principal", Pu = "Sobreposição", Fu = "Recortar", Iu = "Redimensionar", Lu = "Posição", Ru = "Largura", zu = "Altura", Bu = "Superior", Vu = "Direita", Hu = "Inferior", Uu = "Esquerda", Wu = "Fundo", Gu = "Abas", Ku = {
		"Accent color": "Cor de destaque",
		"Action button": "Botão de ação",
		"Actions per row": "Ações por linha",
		"Add a card to start.": "Adicione um cartão para começar.",
		"Battery entity {index}": "Entidade de bateria {index}",
		"Button {index}": "Botão {index}",
		Cards: Ou,
		"Choose color": "Escolher cor",
		"Choose icon": "Escolher ícone",
		"Curve buttons": "Botões curvos",
		Dynamic: ku,
		"ETA entity": "Entidade ETA",
		Equal: Au,
		Files: ju,
		"Icon only": "Somente ícone",
		"Items per row": "Itens por linha",
		"Label template": "Modelo de rótulo",
		"Loading files...": "Carregando arquivos...",
		"Local Icons": "Ícones locais",
		"Lock curve button positions": "Bloquear posições dos botões curvos",
		"Main entity": "Entidade principal",
		"Move left": "Mover para a esquerda",
		"Move right": "Mover para a direita",
		"Navigation path": "Caminho de navegação",
		"No matching colors": "Nenhuma cor correspondente",
		"No matching actions": "Nenhuma ação correspondente",
		"No matching files": "Nenhum arquivo correspondente",
		"Person entity": "Entidade de pessoa",
		"Separate cards": "Cartões separados",
		Separator: Mu,
		"State light color": "Cor de estado da luz",
		"State color (default)": "Cor de estado (padrão)",
		"State template": "Modelo de estado",
		"Status {index}": "Status {index}",
		"Status color": "Cor do status",
		"Status name": "Nome do status",
		"Status sensors": "Sensores de status",
		"Card background": "Fundo do cartão",
		"Force padding": "Forçar preenchimento",
		Main: Nu,
		Overlay: Pu,
		Crop: Fu,
		Resize: Iu,
		Position: Lu,
		Width: Ru,
		Height: zu,
		Top: Bu,
		"Transparent background": "Fundo transparente",
		Right: Vu,
		Bottom: Hu,
		Left: Uu,
		"Primary text color": "Cor do texto primário",
		"Secondary background color": "Cor de fundo secundário",
		Background: Wu,
		"Tab font size": "Tamanho da fonte da aba",
		"Tab width": "Largura da aba",
		Tabs: Gu,
		"Tracker entity": "Entidade de rastreamento",
		"No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually.": "Nenhum arquivo encontrado. Adicione um manifesto de ícones local em /local/icons/manifest.json ou digite o nome do arquivo manualmente.",
		"Orbit Action Card (Dev) v{version}": "Orbit Action Card (Dev) v{version}",
		"Orbit Icons": "Ícones Orbit",
		"Orbit Area Card (Dev) v{version}": "Orbit Area Card (Dev) v{version}",
		"Orbit Deck Card (Dev) v{version}": "Orbit Deck Card (Dev) v{version}",
		"Orbit Status Card (Dev) v{version}": "Orbit Status Card (Dev) v{version}"
	};
}));
//#endregion
//#region src/common/localize.js
function X(e, t, n = {}) {
	let r = Xu(e), i = r.replace("_", "-"), a = r.split("-")[0], o = Ju(e, t) || Yu(r, t) || Yu(i, t) || Yu(a, t) || Zu.en[t] || t;
	return Object.entries(n).reduce((e, [t, n]) => e.replaceAll(`{${t}}`, n ?? ""), o);
}
function Ju(e, t) {
	if (!e?.localize || !t) return null;
	let n = Qu[t] || [];
	for (let t of n) {
		let n = e.localize(t);
		if (n && n !== t) return n;
	}
	return null;
}
function Yu(e, t) {
	let n = Zu[e]?.[t];
	return n === "" ? null : n;
}
function Xu(e) {
	return (e?.locale?.language || e?.language || "en").toLowerCase();
}
var Zu, Qu, $u = e((() => {
	_c(), Ic(), nl(), Sl(), Vl(), su(), Du(), qu(), Zu = {
		de: tl,
		en: gc,
		"en-gb": Fc,
		en_gb: Fc,
		es: xl,
		fr: Bl,
		it: ou,
		nl: Eu,
		"pt-br": Ku,
		pt_br: Ku
	}, Qu = {
		Add: ["ui.common.add"],
		All: ["ui.components.selectors.automation_behavior.trigger.options.all.label", "ui.panel.config.backup.data.apps_all"],
		Active: [
			"ui.panel.config.users.editor.active",
			"ui.panel.config.users.picker.headers.is_active",
			"ui.panel.config.zwave_js.provisioned.active"
		],
		Area: [
			"ui.components.selectors.selector.types.area",
			"ui.components.entity.entity-name-picker.types.area",
			"ui.components.area-picker.area"
		],
		Background: ["ui.panel.lovelace.editor.card.tile.background", "ui.panel.lovelace.editor.card.generic.background"],
		Badges: ["ui.panel.lovelace.editor.card.heading.badges", "ui.panel.lovelace.editor.badges.name"],
		Color: ["ui.panel.lovelace.editor.card.tile.color", "ui.dialogs.label-detail.color"],
		Clear: ["ui.common.clear"],
		Custom: [
			"ui.components.entity.entity-name-picker.mode_custom",
			"ui.panel.lovelace.editor.edit_card.pick_card.custom",
			"ui.panel.config.backup.setup.custom_heading",
			"ui.panel.config.backup.schedule.time_options.custom",
			"ui.panel.config.backup.data.apps_custom"
		],
		Entity: [
			"ui.components.selectors.selector.types.entity",
			"ui.components.entity.entity-picker.entity",
			"ui.panel.lovelace.editor.card.generic.entity"
		],
		Disabled: ["ui.dialogs.entity_registry.editor.disabled_label", "ui.panel.config.entities.picker.status.disabled"],
		Divider: ["ui.panel.lovelace.editor.card.entities.entity_row.divider"],
		Default: ["ui.common.default"],
		Duplicate: ["ui.common.duplicate"],
		Enabled: ["ui.dialogs.entity_registry.editor.enabled_label", "ui.panel.config.entities.picker.status.enabled"],
		Equal: ["ui.components.selectors.select.options.equal"],
		Icon: ["ui.components.selectors.selector.types.icon", "ui.panel.lovelace.editor.card.generic.icon"],
		Inactive: ["ui.components.color-picker.colors.inactive"],
		Interactions: ["ui.panel.lovelace.editor.card.tile.interactions", "ui.panel.lovelace.editor.card.generic.interactions"],
		None: ["ui.common.none"],
		Accent: ["ui.components.color-picker.colors.accent"],
		Automations: ["ui.panel.config.automation.caption", "ui.dialogs.more_info_control.add_to.automations_heading"],
		Away: ["state_badge.person.not_home"],
		Buttons: ["ui.panel.lovelace.editor.card.entities.entity_row.buttons"],
		Card: ["ui.panel.lovelace.editor.card.conditional.card"],
		"Display precision": ["ui.dialogs.entity_registry.editor.precision"],
		"Double tap behavior": ["ui.panel.lovelace.editor.card.generic.double_tap_action"],
		Home: ["state_badge.person.home"],
		Icons: ["ui.panel.lovelace.editor.features.types.climate-preset-modes.style_list.icons"],
		"Icon tap behavior": ["ui.panel.lovelace.editor.card.tile.icon_tap_action"],
		"Hold behavior": ["ui.panel.lovelace.editor.card.generic.hold_action"],
		"Icon hold behavior": ["ui.panel.lovelace.editor.card.tile.icon_hold_action"],
		"Icon double tap behavior": ["ui.panel.lovelace.editor.card.tile.icon_double_tap_action"],
		Mode: ["ui.card.climate.mode"],
		Person: ["component.person.entity_component._.name"],
		Position: ["ui.panel.lovelace.editor.card.entities.secondary_info_values.position", "ui.card.cover.position"],
		Prefix: ["ui.panel.lovelace.editor.elements.prefix"],
		Primary: ["ui.components.color-picker.colors.primary"],
		Name: ["ui.common.name"],
		Remove: ["ui.common.remove"],
		Search: ["ui.components.data-table.search", "ui.panel.lovelace.editor.card.generic.search"],
		Scenes: ["ui.panel.config.scene.caption"],
		Scripts: ["ui.panel.config.script.caption"],
		Security: ["panel.security"],
		Standard: ["ui.panel.config.energy.battery.dialog.type_standard"],
		Status: ["ui.panel.config.entities.picker.headers.status"],
		Style: ["ui.panel.lovelace.editor.features.types.climate-preset-modes.style", "ui.panel.lovelace.editor.features.types.numeric-input.style"],
		"Tap behavior": ["ui.panel.lovelace.editor.card.generic.tap_action"],
		Theme: ["ui.components.selectors.selector.types.theme", "ui.components.theme-picker.theme"],
		Top: ["ui.panel.lovelace.editor.edit_view_header.settings.badges_position_options.top"],
		Right: ["ui.panel.lovelace.editor.card.energy-date-selection.opening_directions.right"],
		Bottom: ["ui.panel.lovelace.editor.card.tile.features_position_options.bottom", "ui.panel.lovelace.editor.edit_view_header.settings.badges_position_options.bottom"],
		Left: ["ui.panel.lovelace.editor.card.energy-date-selection.opening_directions.left"],
		Width: ["ui.panel.lovelace.editor.edit_section.settings.column_span"],
		Wrap: ["ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap"]
	};
})), Z, Q = e((() => {
	Z = {
		area: "0.8.5",
		status: "0.13.6",
		action: "0.6.5",
		deck: "0.4.1",
		statusBadge: "0.1.0"
	};
})), ed = /* @__PURE__ */ t((() => {
	M(), Io(), vs(), Cs(), Ms(), Wi(), Qs(), B(), Rt(), Pt(), $u(), Q();
	var e = class extends j {
		static svgCache = z;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_activeSection: { state: !0 },
			_selectedStatusIndex: { state: !0 },
			_selectedButtonIndex: { state: !0 },
			_selectedCurveButtonIndex: { state: !0 },
			_areaButtonDomainFilter: { state: !0 },
			_areaCurveButtonDomainFilter: { state: !0 },
			_areaActionButtonDomainFilter: { state: !0 },
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
			super(), this._config = this._config || {}, this._activeSection = "card", this._selectedStatusIndex = 1, this._selectedButtonIndex = 1, this._selectedCurveButtonIndex = 1, this._areaButtonDomainFilter = "all", this._areaCurveButtonDomainFilter = "all", this._areaActionButtonDomainFilter = "all", this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._iconFileSearch = "", this._iconFilePickerOpen = !1, this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1;
		}
		connectedCallback() {
			super.connectedCallback(), wo(this), this._updateDocumentationContext();
		}
		disconnectedCallback() {
			To(this), super.disconnectedCallback();
		}
		_getColorStyle(e) {
			return Do(e);
		}
		_getColorPickerValue(e) {
			return Oo(e);
		}
		_t(e, t) {
			return X(this.hass, e, t);
		}
		setConfig(e) {
			let { config: t, migrated: n } = Lt(e || {});
			this._config = t || {}, this._updateDocumentationContext(), n && this._queueConfigMigration();
		}
		_queueConfigMigration() {
			this._configMigrationQueued || (this._configMigrationQueued = !0, Promise.resolve().then(() => {
				this._configMigrationQueued = !1, this.dispatchEvent(new CustomEvent("config-changed", {
					detail: { config: l(this._config) },
					bubbles: !0,
					composed: !0
				}));
			}));
		}
		_updateConfig(e) {
			let t = { ...e };
			Object.prototype.hasOwnProperty.call(t, "tap_action") && t.tap_action !== void 0 && (t.navigate = void 0);
			let n = Qi(this._config, t), r = yi(n, {
				sourceKey: "main_entity_icon_source",
				entityKey: "main_entity",
				areaKey: "area",
				allowArea: !0,
				customIconKeys: [
					"main_entity_icon",
					"main_entity_icon_on",
					"main_entity_icon_off"
				]
			}), i = Object.prototype.hasOwnProperty.call(t, "main_entity_icon_source") && t.main_entity_icon_source !== "custom", a = r !== "custom" && n.main_entity_icon === "";
			(i || a) && (n.main_entity_icon = void 0), this._config = l(Qi(n, {})), this.dispatchEvent(new CustomEvent("config-changed", {
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
			this._updateConfig(K("main_entity", r));
		}
		_clearStatusEntity(e) {
			this._updateConfig($i(e, i));
		}
		_clearButtonEntity(e) {
			this._updateConfig($i(e, a));
		}
		_clearCurveButtonEntity(e) {
			this._updateConfig($i(e, o));
		}
		_clearActionButtonEntity(e) {
			this._updateConfig($i(e, s));
		}
		_renderInput(e, t, n = "", r = {}) {
			return Ji.call(this, e, t, n, r);
		}
		_renderTemplateInput(e, t) {
			return Yi.call(this, e, t);
		}
		_handleConfigUpdate(e, t) {
			this._updateConfig({ [e]: t });
		}
		_renderColor(e, t, n) {
			return ra.call(this, e, t, n);
		}
		_renderColorControl(e, t, n, r, i = n) {
			return ia.call(this, e, t, n, r, i);
		}
		_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
			return _i.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return bi.call(this, e);
		}
		_isImageIcon(e) {
			return hi(e);
		}
		_resolveIconPath(e) {
			return gi(e);
		}
		_getInlineSvg(e) {
			return R.call(this, e, { forceColor: !0 });
		}
		_renderEntity(e, t, n) {
			return yo.call(this, e, t, n);
		}
		_renderArea(e, t) {
			return bo.call(this, e, t);
		}
		_renderAreaSection() {
			return ms.call(this);
		}
		_renderStatusSection() {
			let e = this._selectedStatusIndex || 1;
			return D`
      <div class="section">
        <div class="selector-pair status-settings-row">
          <div class="status-separator-field">
            ${this._renderInput("Separator", "status_separator", "|")}
          </div>

          ${this._renderColorControl("Color", "status_color", this._config?.status_color || this._config?.accent_color || "", (e) => this._handleConfigUpdate("status_color", e), this._config?.status_color || this._config?.accent_color || "")}
        </div>

        <div
          class="editor-segment-menu"
          style="--editor-segment-columns: 3;"
        >
          ${[
				1,
				2,
				3
			].map((t) => D`
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

          ${vi.call(this, {
				label: ["Prefix", "Icon"],
				sourceKey: `status${e}_icon_source`,
				entityKey: `status${e}`,
				allowNone: !0,
				customIconKeys: [`status${e}_icon`],
				renderCustom() {
					return this._renderIconInput("", `status${e}_icon`, "mdi:thermometer / icon.svg / 🌡️");
				}
			})}

          ${this._renderInput("Display precision", `status${e}_decimal_places`, "entity default")}
        </div>
      </div>
    `;
		}
		_renderButtonsSection() {
			return ys.call(this);
		}
		_renderCurvedButtonsSection() {
			return ws.call(this);
		}
		_renderActionButtonSection() {
			return Ts.call(this);
		}
		_renderEditorTabs() {
			return D`
      <div class="editor-tabs">
        ${t.map((e) => D`
          <button
            type="button"
            class="editor-tab ${this._activeSection === e.key ? "active" : ""}"
            @click=${() => {
				this._activeSection = e.key, this._updateDocumentationContext();
			}}
          >
            ${this._t(e.label)}
          </button>
        `)}
      </div>
    `;
		}
		_updateDocumentationContext() {
			At(this, this._config?.type || "orbit-area-card-dev", this._activeSection || "card");
		}
		_renderActiveSection() {
			let e = t.find((e) => e.key === this._activeSection) || t[0];
			return this[e.render]();
		}
		render() {
			return D`
      <div class="wrapper">
        ${this._renderEditorTabs()}
        ${this._renderActiveSection()}
        <div class="editor-version">
          ${this._t("Orbit Area Card (Dev) v{version}", { version: Z.area })}
        </div>
      </div>
    `;
		}
		static styles = [Zs];
	}, t = [
		{
			key: "card",
			label: "Card",
			render: "_renderAreaSection"
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
			label: "Curve buttons",
			render: "_renderCurvedButtonsSection"
		},
		{
			key: "action",
			label: "Action button",
			render: "_renderActionButtonSection"
		}
	], n = class extends e {};
	customElements.define("orbit-area-card-dev-editor", e), customElements.define("orbit-room-card-dev-editor", n);
	var r = [
		"main_entity_icon_source",
		"main_entity_icon",
		"main_entity_icon_on",
		"main_entity_icon_off",
		"tap_action",
		"hold_action",
		"double_tap_action",
		"main_entity_tap_action",
		"main_entity_hold_action",
		"main_entity_double_tap_action"
	], i = [
		"_icon_source",
		"_icon",
		"_decimal_places"
	], a = [
		"_on_color",
		"_off_color",
		"_icon_source",
		"_icon",
		"_icon_on",
		"_icon_off",
		"_state_template",
		"_tap_action",
		"_hold_action",
		"_double_tap_action"
	], o = [
		"_icon_source",
		"_icon",
		"_icon_on",
		"_icon_off",
		"_state_template",
		"_tap_action",
		"_hold_action",
		"_double_tap_action"
	], s = [
		"_icon_source",
		"_icon",
		"_icon_on",
		"_icon_off",
		"_state_template",
		"_tap_action",
		"_hold_action",
		"_double_tap_action"
	], c = [
		"type",
		"area_name",
		"room_name",
		"accent_color",
		"status_color",
		"area",
		"navigate",
		"tap_action",
		"hold_action",
		"double_tap_action",
		"main_entity",
		"main_entity_icon_source",
		"main_entity_icon",
		"main_entity_icon_on",
		"main_entity_icon_off",
		"main_entity_icon_svg_color_override",
		"main_entity_icon_on_svg_color_override",
		"main_entity_icon_off_svg_color_override",
		"main_entity_tap_action",
		"main_entity_hold_action",
		"main_entity_double_tap_action",
		"status_separator",
		...[
			1,
			2,
			3
		].flatMap((e) => [
			`status${e}`,
			`status${e}_icon_source`,
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
			`button${e}_icon_source`,
			`button${e}_icon`,
			`button${e}_icon_on`,
			`button${e}_icon_off`,
			`button${e}_icon_svg_color_override`,
			`button${e}_icon_on_svg_color_override`,
			`button${e}_icon_off_svg_color_override`,
			`button${e}_state_template`,
			`button${e}_tap_action`,
			`button${e}_hold_action`,
			`button${e}_double_tap_action`
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
			`curve_button${e}_on_color`,
			`curve_button${e}_off_color`,
			`curve_button${e}_icon_source`,
			`curve_button${e}_icon`,
			`curve_button${e}_icon_on`,
			`curve_button${e}_icon_off`,
			`curve_button${e}_icon_svg_color_override`,
			`curve_button${e}_icon_on_svg_color_override`,
			`curve_button${e}_icon_off_svg_color_override`,
			`curve_button${e}_state_template`,
			`curve_button${e}_tap_action`,
			`curve_button${e}_hold_action`,
			`curve_button${e}_double_tap_action`
		]),
		"action_button",
		"action_button_icon_source",
		"action_button_icon",
		"action_button_icon_on",
		"action_button_icon_off",
		"action_button_icon_svg_color_override",
		"action_button_icon_on_svg_color_override",
		"action_button_icon_off_svg_color_override",
		"action_button_state_template",
		"action_button_tap_action",
		"action_button_hold_action",
		"action_button_double_tap_action",
		"grid_options",
		"view_layout"
	];
	function l(e) {
		let t = {}, n = /* @__PURE__ */ new Set();
		return c.forEach((r) => {
			Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r], n.add(r));
		}), Object.keys(e).forEach((r) => {
			n.has(r) || (t[r] = e[r]);
		}), t;
	}
})), td = /* @__PURE__ */ t((() => {
	M(), at(), L(), Dt(), It(), Rt(), Vt(), Dn(), jn(), Nn(), Ln(), Vn(), B(), fr(), br(), wr(), Br(), fi(), ed(), Q();
	var e = class extends j {
		static svgCache = z;
		static get properties() {
			return {
				hass: {},
				_config: { type: Object },
				_cardName: { type: String },
				_statusText: { type: String },
				_statusItems: { type: Array },
				_icon: { type: String },
				_areaColor: { type: String },
				_statusColor: { type: String },
				_iconColor: { type: String },
				_circleColor: { type: String }
			};
		}
		static getConfigElement() {
			return document.createElement("orbit-area-card-dev-editor");
		}
		static getStubConfig(e) {
			let t = i(e), n = {
				type: "custom:orbit-area-card-dev",
				accent_color: "blue",
				tap_action: {
					action: "navigate",
					navigation_path: "/lovelace/home"
				}
			};
			return t && (n.area = t), n;
		}
		getLayoutOptions() {
			return {
				grid_columns: 3,
				grid_min_columns: 2,
				grid_rows: "auto"
			};
		}
		setConfig(e) {
			this._config = Lt(e).config, this._areaColor = this._computeFullColor(this._config.accent_color), this._statusColor = this._computeFullColor(this._config.status_color || this._config.accent_color), this._iconColor = this._computeIconColor(this._config.accent_color), this._circleColor = this._computeCircleColor(this._config.accent_color);
		}
		willUpdate(e) {
			return Kn.call(this, e);
		}
		shouldUpdate(e) {
			return Pn.call(this, e, this._getRelevantEntities(), { hasTemplates: Fn(this._config) });
		}
		_handleAction(e, t = null) {
			return Ue.call(this, e, t);
		}
		_navigate(e) {
			return qe.call(this, e);
		}
		_toggleEntity(e, t, n = null) {
			return Je.call(this, e, t, n);
		}
		_handleButtonClick(e) {
			return Ye.call(this, e);
		}
		_handleButtonDoubleClick(e) {
			return Xe.call(this, e);
		}
		_handleCurveButtonClick(e) {
			return Ze.call(this, e);
		}
		_handleCurveButtonDoubleClick(e) {
			return Qe.call(this, e);
		}
		_handleTap(e) {
			return $e.call(this, e);
		}
		_handleCardPointerDown(e) {
			if (P(this) || t(e)) return;
			let n = this._config?.hold_action;
			if (!(!n?.action || n.action === "none")) return this._startLongPress(e, this._config.main_entity || this._config.entity, n);
		}
		_handleCardDoubleTap(e) {
			return et.call(this, e);
		}
		_handleMainEntityTap(e) {
			return tt.call(this, e);
		}
		_handleMainEntityDoubleTap(e) {
			return nt.call(this, e);
		}
		_handleMainEntityPointerDown(e) {
			if (!P(this)) return this._startLongPress(e, this._config.main_entity || this._config.entity, this._config.main_entity_hold_action);
		}
		_handleButtonPointerDown(e) {
			if (P(this)) return;
			let t = e.currentTarget;
			return this._startLongPress(e, t.dataEntity, t.dataHoldAction);
		}
		_computeFullColor(e) {
			return ot.call(this, e);
		}
		_computeIconColor(e) {
			return st.call(this, e);
		}
		_computeCircleColor(e) {
			return ct.call(this, e);
		}
		_computeButtonBackground(e) {
			return lt.call(this, e);
		}
		_getCardName(e = "Card") {
			return xt(this._config, this.hass, e);
		}
		formatState(e) {
			return zt(e);
		}
		_getEntityActiveState(e) {
			return Bt(e);
		}
		_getMainIconColor(e, t) {
			return _n.call(this, e, t);
		}
		_getEntityColor(e) {
			return vn(e);
		}
		_isImageIcon(e) {
			return yn(e);
		}
		_resolveIconPath(e) {
			return bn(e);
		}
		_getInlineSvg(e, t = !0, n = !1) {
			return R.call(this, e, {
				forceColor: t,
				animate: n
			});
		}
		_getSvgColorOverride(e) {
			return xn(this._config, e);
		}
		get _LONG_PRESS_DELAY() {
			return 500;
		}
		_startLongPress(e, t, n) {
			return On.call(this, e, t, n);
		}
		_cancelLongPress() {
			return kn.call(this);
		}
		_clearDoubleTapTimer() {
			return We.call(this);
		}
		_finishLongPress(e) {
			return An.call(this, e);
		}
		_evaluateStateTemplate(e, t) {
			return Mn.call(this, e, t);
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
			return yr.call(this, e);
		}
		_renderCurveButtons() {
			return Rr.call(this);
		}
		render() {
			return xr.call(this);
		}
		static styles = di;
	};
	function t(e) {
		return e.composedPath().some((e) => e?.classList ? e.classList.contains("entity-button") || e.classList.contains("curve-button") || e.classList.contains("action-button") : !1);
	}
	var n = class extends e {};
	Ft({
		tag: "orbit-area-card-dev",
		cardClass: e,
		name: "Orbit Area Card (Dev)",
		description: "Responsive area card",
		version: Z.area,
		getEntitySuggestion: a,
		aliases: [{
			tag: "orbit-room-card-dev",
			cardClass: n
		}]
	});
	var r = new Set([
		"light",
		"fan",
		"climate",
		"media_player",
		"switch",
		"cover",
		"lock"
	]);
	function i(e) {
		return Object.keys(e?.areas || {}).sort((t, n) => {
			let r = e.areas[t]?.name || t, i = e.areas[n]?.name || n;
			return r.localeCompare(i, void 0, { sensitivity: "base" });
		})[0] || "";
	}
	function a(e, t) {
		let n = Rn(t);
		if (!r.has(n)) return null;
		let i = zn(e, t), a = {
			type: "custom:orbit-area-card-dev",
			main_entity: t,
			accent_color: n === "light" ? "light" : "theme"
		};
		return i && (a.area = i), { config: a };
	}
}));
//#endregion
//#region src/common/helpers/card-layout.js
function nd({ config: e = {}, count: t = 1, wrapKey: n = "wrap", perRowKey: r, defaultColumns: i = 3 }) {
	if (!e[n]) return Math.max(1, t);
	let a = Number(e[r]);
	return Math.max(1, Math.min(t, (Number.isFinite(a) ? Math.floor(a) : i) || 1));
}
function rd(e) {
	let t = nd(e);
	return Math.max(1, Math.ceil((e?.count || 1) / t));
}
var id = e((() => {}));
//#endregion
//#region src/cards/status/helpers/attributes.js
function $(e, t) {
	let n = e?.attributes?.[t];
	return n == null || typeof n == "string" && n.trim() === "" ? null : n;
}
function ad(e) {
	let t = e.navigate?.navigation_path;
	return typeof t == "string" && t.trim() || null;
}
function od(e, t, n) {
	let r = $(t, "color");
	return n ? e.accent_on_color || r || "theme" : e.accent_off_color || r || "theme";
}
function sd(e, t = null, n = null) {
	if (!e) return !1;
	let r = (n ?? e.state)?.toString().trim().toLowerCase(), i = Number(r);
	if (Number.isFinite(i)) return i > 0;
	if (ld.includes(r)) return !1;
	let a = e.entity_id?.split(".")[0];
	return [
		"sensor",
		"input_text",
		"input_select",
		"select"
	].includes(a) ? !0 : typeof t == "function" ? t(e) : !0;
}
function cd(e, t) {
	let n = $(t, "navigation"), r = typeof n == "string" ? n.trim() : n?.navigation_path;
	return ad(e) || r || "/lovelace/home";
}
var ld, ud = e((() => {
	ld = [
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
function dd(e) {
	let t = e?.states;
	if (!t) return {
		zones: [],
		zoneByTrackerState: /* @__PURE__ */ new Map()
	};
	let n = pd.get(t);
	if (n) return n;
	let r = Object.values(t).filter((e) => e.entity_id?.startsWith("zone.") && !e.attributes?.passive), i = {
		zones: r,
		zoneByTrackerState: new Map(r.map((e) => [fd(e), e]))
	};
	return pd.set(t, i), i;
}
function fd(e) {
	return (e.attributes?.friendly_name || e.entity_id.replace(/^zone\./, "")).toLowerCase().replace(/\s+/g, "_");
}
var pd, md = e((() => {
	pd = /* @__PURE__ */ new WeakMap();
}));
//#endregion
//#region src/cards/status/helpers/lifecycle.js
function hd(e) {
	if (!e.has("_config") && !e.has("hass")) return;
	if (this._config.mode === "person") {
		bd.call(this);
		return;
	}
	if (this._config.mode === "icon_only") {
		let e = gd(this._config);
		this._statusItems = e.map((e) => _d.call(this, e, this._config)), yd.call(this, this._statusItems[0] || {});
		return;
	}
	let t = this._config.main_entity, n = _d.call(this, { entity: t }, this._config);
	this._statusItems = [n], yd.call(this, n);
}
function gd(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.main_entity,
		accent_on_color: e.accent_on_color,
		accent_off_color: e.accent_off_color,
		main_entity_icon_source: e.main_entity_icon_source,
		main_entity_icon: e.main_entity_icon,
		main_entity_icon_on: e.main_entity_icon_on,
		main_entity_icon_off: e.main_entity_icon_off,
		main_entity_icon_svg_color_override: e.main_entity_icon_svg_color_override,
		main_entity_icon_on_svg_color_override: e.main_entity_icon_on_svg_color_override,
		main_entity_icon_off_svg_color_override: e.main_entity_icon_off_svg_color_override,
		state_template: e.state_template,
		label_template: e.label_template,
		tap_action: e.tap_action,
		hold_action: e.hold_action,
		double_tap_action: e.double_tap_action,
		main_entity_tap_action: e.main_entity_tap_action,
		main_entity_hold_action: e.main_entity_hold_action,
		main_entity_double_tap_action: e.main_entity_double_tap_action
	}];
}
function _d(e, t = {}) {
	let n = e.entity || t.main_entity, r = n && this.hass ? this.hass.states[n] : null, i = {
		...t,
		...e,
		main_entity: n
	}, a = i.mode !== "icon_only" && Object.prototype.hasOwnProperty.call(i, "status_name") && i.status_name !== void 0 && i.status_name !== "" ? St(i.status_name, i, this.hass) : $(r, "friendly_name") || n || X(this.hass, "Status"), o = i.state_template ? this._evaluateStateTemplate(i.state_template, n) : null, s = (i.label_template ? this._evaluateStateTemplate(i.label_template, n) : null) ?? ($(r, "label") || (r ? this.formatState(r) : "")), c = i.main_entity_icon, l = i.main_entity_icon_on, u = i.main_entity_icon_off, d = sd(r, (e) => this._getEntityActiveState(e), o), f = vd(i, n), p = f === "custom" && ((d ? l : u) || c) || "", m = p || "mdi:information-outline", h = f === "custom" && d && l ? "main_entity_icon_on" : f === "custom" && !d && u ? "main_entity_icon_off" : f === "custom" && c ? "main_entity_icon" : "", g = od(i, r, d), ee = cd(i, r), _ = this._computeFullColor(g), v = this._computeFullColor(g), te = this._computeCircleColor(g), ne = d ? this._computeFullColor(g) : this._computeIconColor(g);
	return {
		...e,
		entityId: n,
		stateObj: r,
		useStateIcon: !!r && !p,
		cardName: a,
		statusText: s,
		icon: m,
		navigationPath: ee,
		nameColor: _,
		statusColor: v,
		circleColor: te,
		iconColor: ne,
		svgForceColor: h ? this._getSvgColorOverride(i, h) : !0
	};
}
function vd(e, t) {
	let n = e.main_entity_icon_source, r = !!t, i = !!(e.main_entity_icon || e.main_entity_icon_on || e.main_entity_icon_off);
	return n === "custom" ? "custom" : n === "entity" && r ? "entity" : i ? "custom" : "entity";
}
function yd(e) {
	this._cardName = e.cardName ?? X(this.hass, "Status"), this._statusText = e.statusText || "", this._icon = e.icon || "mdi:information-outline", this._mainStateObj = e.stateObj || null, this._useNativeMainIcon = e.useStateIcon ?? !1, this._navigationPath = e.navigationPath || "", this._nameColor = e.nameColor || this._nameColor, this._statusColor = e.statusColor || this._statusColor, this._circleColor = e.circleColor || this._circleColor, this._iconColor = e.iconColor || this._iconColor, this._iconSvgForceColor = e.svgForceColor ?? !0;
}
function bd() {
	let e = this._config.main_entity, t = this._config.tracker_entity, n = this._config.eta_entity, r = t && this.hass ? this.hass.states[t] : null, i = e && this.hass ? this.hass.states[e] : null, a = n && this.hass ? this.hass.states[n] : null, o = Object.prototype.hasOwnProperty.call(this._config, "status_name") && this._config.status_name !== void 0 && this._config.status_name !== "";
	this._cardName = o ? St(this._config.status_name, this._config, this.hass) : $(i, "friendly_name") || $(r, "friendly_name") || e || t || X(this.hass, "Person");
	let s = (this._config.label_template ? this._evaluateStateTemplate(this._config.label_template, t) : null) ?? (r ? Sd.call(this, r) : ""), c = a && r?.state !== "home" ? this.formatState(a) : "";
	this._statusText = c ? `${s} | ${c}` : s;
	let l = sd(r, (e) => this._getEntityActiveState(e), this._config.state_template ? this._evaluateStateTemplate(this._config.state_template, t) : null), u = od(this._config, r, l);
	this._personPicture = $(i, "entity_picture") || $(r, "entity_picture") || "", this._personZoneIcon = xd.call(this, r, i), this._personBattery1 = Cd.call(this, this._config.battery_entity_1), this._personBattery2 = Cd.call(this, this._config.battery_entity_2), this._icon = $(i, "icon") || $(r, "icon") || "mdi:account", this._navigationPath = cd(this._config, r), this._nameColor = this._computeFullColor(u), this._statusColor = this._computeFullColor(u), this._circleColor = this._computeCircleColor(u), this._iconColor = l ? this._computeFullColor(u) : this._computeIconColor(u), this._iconSvgForceColor = !0;
}
function xd(e, t) {
	if (e?.state === "home") return "mdi:home-variant";
	let n = dd(this.hass), r = t?.entity_id;
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
function Sd(e) {
	let t = e?.state;
	return t ? t === "home" ? X(this.hass, "Home") : t === "not_home" ? X(this.hass, "Away") : t.replace(/_/g, " ").replace(/\b\w/g, (e) => e.toUpperCase()) : "";
}
function Cd(e) {
	let t = e && this.hass ? this.hass.states[e] : null;
	if (!t) return null;
	let n = Number(t.state), r = "var(--state-icon-color)";
	return Number.isFinite(n) && (r = n >= 70 ? "var(--state-sensor-battery-high-color)" : n >= 30 ? "var(--state-sensor-battery-medium-color)" : "var(--state-sensor-battery-low-color)"), {
		entityId: e,
		stateObj: t,
		color: r
	};
}
var wd = e((() => {
	ud(), md(), Dt(), $u();
}));
//#endregion
//#region src/cards/status/renders/status-card.js
function Td() {
	let e = this._config?.mode || "standard", t = this._statusItems || [], n = e === "icon_only" && t.length > 1, r = Math.max(t.length, 1), i = this._getStatusColumnCount(r), a = this._getStatusRowCount(r), o = jd(this._statusText), s = this._isImageIcon(this._icon) ? this._resolveIconPath(this._icon) : "", c = s ? this._getInlineSvg(s, this._iconSvgForceColor) : "";
	return D`
    <ha-card
      class="mode-${e} ${n ? "grouped" : ""} ${n && this._config?.separate_cards ? "separate-cards" : ""}"
      tabindex="0"
      style="
        --status-item-count:${r};
        --status-columns:${i};
        --status-rows:${a};
      "
      @click=${this._handleTap}
      @dblclick=${this._handleDoubleTap}
      @pointerdown=${this._handleCardPointerDown}
      @pointerup=${this._handleCardPointerUp}
      @pointerleave=${this._handleCardPointerCancel}
      @pointercancel=${this._handleCardPointerCancel}
      @contextmenu=${this._handleCardContextMenu}
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
        ${n ? Ed.call(this, t, i) : D`
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
          @dblclick=${this._handleMainEntityDoubleTap}
          @contextmenu=${this._handleMainIconContextMenu}
        >
          ${e === "person" ? Od.call(this) : this._isImageIcon(this._icon) ? D`
                <div
                  class="main-image-icon"
                >
                  ${c ? V(c) : D`<img src=${s} alt="" />`}
                </div>
              ` : this._useNativeMainIcon && this._mainStateObj ? D`
                <ha-state-icon
                  class="main-icon"
                  .stateObj=${this._mainStateObj}
                ></ha-state-icon>
              ` : D`
                <ha-icon
                  class="main-icon"
                  .icon=${this._icon}
                ></ha-icon>
            `}
        </div>

        ${e === "icon_only" ? D`
              <div
                class="status-badge"
                ?hidden=${!o}
              >
                ${o}
              </div>
            ` : D`
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
function Ed(e, t) {
	return D`
    <div class="status-icon-grid">
      ${Md(e, t).map((e, n) => D`
        <div class="status-icon-row">
          ${e.map((e, r) => Dd.call(this, e, n * t + r))}
          ${Nd(e.length, t, "status-icon-spacer")}
        </div>
      `)}
    </div>
  `;
}
function Dd(e, t) {
	let n = jd(e.statusText), r = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", i = r ? this._getInlineSvg(r, e.svgForceColor) : "", a = D`
    <div class="circle status-circle">
      ${this._isImageIcon(e.icon) ? D`
            <div class="main-image-icon">
              ${i ? V(i) : D`<img src=${r} alt="" />`}
            </div>
          ` : e.useStateIcon && e.stateObj ? D`
            <ha-state-icon
              class="main-icon"
              .stateObj=${e.stateObj}
            ></ha-state-icon>
          ` : D`
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
  `;
	return (this._statusItems?.length || 0) > 1 && !this._config?.separate_cards ? D`
      <div
        class="status-icon-item"
        style="
          --status-circle-color:${e.circleColor};
          --status-icon-color:${e.iconColor};
        "
        @click=${(e) => this._handleStatusItemClick(e, t)}
        @dblclick=${(e) => this._handleStatusItemDoubleClick(e, t)}
        @pointerdown=${(e) => this._handleStatusItemPointerDown(e, t)}
        @pointerup=${this._handleStatusItemPointerUp}
        @pointerleave=${this._handleStatusItemPointerCancel}
        @pointercancel=${this._handleStatusItemPointerCancel}
        @contextmenu=${(e) => this._handleStatusItemContextMenu(e, t)}
      >
        ${a}
      </div>
    ` : D`
    <ha-card
      class="status-icon-item"
      style="
        --status-circle-color:${e.circleColor};
        --status-icon-color:${e.iconColor};
      "
      @click=${(e) => this._handleStatusItemClick(e, t)}
      @dblclick=${(e) => this._handleStatusItemDoubleClick(e, t)}
      @pointerdown=${(e) => this._handleStatusItemPointerDown(e, t)}
      @pointerup=${this._handleStatusItemPointerUp}
      @pointerleave=${this._handleStatusItemPointerCancel}
      @pointercancel=${this._handleStatusItemPointerCancel}
      @contextmenu=${(e) => this._handleStatusItemContextMenu(e, t)}
    >
      ${a}
    </ha-card>
  `;
}
function Od() {
	return D`
    <div class="person-main-icon">
      ${this._personPicture ? D`
            <img
              class="person-picture"
              src=${this._personPicture}
              alt=""
            />
          ` : D`
          <ha-icon
            class="person-fallback-icon"
            .icon=${this._icon || "mdi:account"}
          ></ha-icon>
          `}

      ${kd.call(this, "zone", this._personZoneIcon || "mdi:home-minus", this._computeFullColor("blue"))}

      ${this._personBattery1 ? kd.call(this, "battery-1", null, this._personBattery1.color, this._personBattery1.entityId, this._personBattery1.stateObj) : ""}

      ${this._personBattery2 ? kd.call(this, "battery-2", null, this._personBattery2.color, this._personBattery2.entityId, this._personBattery2.stateObj) : ""}
    </div>
  `;
}
function kd(e, t, n, r = null, i = null) {
	let a = Ad(i);
	return D`
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
        ${i ? D`
              <ha-state-icon
                class=${a ? "charging" : ""}
                .stateObj=${i}
              ></ha-state-icon>
            ` : D`<ha-icon .icon=${t}></ha-icon>`}
      </span>
    </span>
  `;
}
function Ad(e) {
	let t = e?.attributes || {};
	return String(t.icon || "").toLowerCase().includes("battery-charging") || t.battery_charging === !0 || t.is_charging === !0 || t.charging === !0;
}
function jd(e) {
	let t = String(e || "").match(/-?\d+(?:\.\d+)?/);
	return (t ? Number(t[0]) : null) === 0 ? "" : t?.[0] || "";
}
function Md(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function Nd(e, t, n) {
	let r = Math.max(0, t - e);
	return Array.from({ length: r }, () => D`
    <div class=${n}></div>
  `);
}
var Pd = e((() => {
	M(), H();
})), Fd, Id = e((() => {
	M(), Hr(), Wr(), Kr(), Fd = [
		Vr,
		Ur,
		Gr,
		c`
  ha-card {
    aspect-ratio: 3 / 1;
    border-radius: 15px;
  }

  ha-card.mode-icon_only {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped {
    --orbit-grouped-item-gap: clamp(5px, 1.4cqw, 8px);
    aspect-ratio: auto;
    container-type: inline-size;
  }

  ha-card.mode-icon_only.grouped:not(.separate-cards) {
    background: var(--ha-card-background, var(--card-background-color, #1a1a1a));
    overflow: hidden;
  }

  ha-card.mode-icon_only.grouped.separate-cards {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: var(--ha-card-border-width, 1px) solid transparent;
    box-shadow: none;
    overflow: visible;
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
    touch-action: manipulation;
    z-index: 3;
  }

  .status-circle .main-icon {
    --orbit-main-icon-size: 45%;
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
    display: block;
    height: auto;
    overflow: visible;
    padding: 0;
  }

  .status-icon-grid {
    display: flex;
    flex-direction: column;
    gap: var(--orbit-grouped-item-gap);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .status-container.mode-icon_only.grouped .status-icon-grid {
    height: auto;
  }

  .status-icon-row {
    display: flex;
    gap: var(--orbit-grouped-item-gap);
    width: 100%;
  }

  .status-icon-item {
    border-radius: 15px;
    box-sizing: border-box;
    container-type: size;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .status-icon-spacer {
    flex: 1 1 0;
    min-width: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .status-container.mode-icon_only.grouped .status-icon-item {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped:not(.separate-cards) .status-icon-item {
    --ha-card-background: transparent;
    --card-background-color: transparent;
    background: transparent !important;
    border: var(--ha-card-border-width, 1px) solid transparent;
    box-shadow: none;
  }

  .status-container.mode-icon_only.grouped .status-icon-spacer {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped.separate-cards .status-icon-item {
    border-radius: 15px;
    overflow: hidden;
  }

  .status-icon-item .status-circle {
    left: -12%;
    top: auto;
    bottom: -12%;
    width: 82%;
  }

  .status-container.mode-icon_only .status-circle .main-icon {
    --orbit-main-icon-size: 54%;
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

  .person-badge ha-icon,
  .person-badge ha-state-icon {
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

  .person-badge ha-state-icon {
    transform: translate(4%, -10%);
  }

  .person-badge ha-state-icon.charging {
    transform: translate(10%, -10%);
  }

  .person-badge-battery-1 {
    left: 69%;
    top: 4%;
  }

  .person-badge-battery-2 {
    left: 94%;
    top: 25%;
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
//#region src/common/editor/helpers/group-options.js
function Ld({ config: e = {}, itemCount: t = 0, wrapEnabled: n = !!e?.wrap, perRowKey: r = "items_per_row", defaultPerRow: i = 3, scrollThreshold: a = 6 } = {}) {
	let o = Math.max(1, Number(e?.[r]) || i), s = !!n && t > o;
	return {
		itemsPerRow: o,
		shouldWrapTabs: s,
		showTabScrollHint: !s && t > a || s && o > a
	};
}
function Rd({ itemCount: e = 0, classPrefix: t, wrapKey: n = "wrap", wrapEnabled: r = !!this._config?.[n], showWrapToggle: i = !0, showSeparateToggle: a = e > 1, separateKey: o = "separate_cards", perRowKey: s = "items_per_row", perRowLabel: c = "Items per row", defaultPerRow: l = 3 } = {}) {
	let u = t || "action";
	return D`
    <div class="${u}-group-options">
      ${i ? D`
            <label class="${u}-wrap-toggle">
              <span>${this._t("Wrap")}</span>
              <ha-switch
                .checked=${!!r}
                @change=${(e) => this._updateConfig({
		[n]: e.target.checked,
		[s]: e.target.checked ? this._config?.[s] || l : this._config?.[s]
	})}
              ></ha-switch>
            </label>
          ` : ""}

      ${a ? D`
            <label class="${u}-wrap-toggle">
              <span>${this._t("Separate cards")}</span>
              <ha-switch
                .checked=${!!this._config?.[o]}
                @change=${(e) => this._updateConfig({ [o]: e.target.checked })}
              ></ha-switch>
            </label>
          ` : ""}

      ${r ? D`
            <div class="${u}-per-row-field">
              ${this._renderNumberInput(c, s, {
		value: this._config?.[s] || l,
		min: 1,
		step: 1,
		onValueChanged: (e) => this._updateConfig({ [s]: Math.max(1, Number(e) || 1) })
	})}
            </div>
          ` : ""}
    </div>
  `;
}
var zd = e((() => {
	M();
}));
//#endregion
//#region src/editors/status/sections/status.js
function Bd() {
	let e = this._config?.mode || "standard", t = e === "icon_only", n = e === "person", r = t || n ? "more-info" : "navigate", i = this._config?.tap_action?.action || r, a = t || n ? i : "more-info";
	return D`
    <div class="section">
      <div class="field editor-button-toggle-field">
        <div class="field-header">
          <label>${this._t("Mode")}</label>

          <ha-selector
            class="editor-header-button-toggle status-mode-selector"
            .hass=${this.hass}
            .selector=${{ button_toggle: { options: qd.call(this) } }}
            .value=${e}
            @value-changed=${(e) => this._updateConfig({ mode: e.detail.value || "standard" })}
          ></ha-selector>
        </div>
      </div>
    </div>

    ${t ? Hd.call(this, {
		cardActionDefault: r,
		mainEntityActionDefault: a
	}) : D`
          <div class="section">
            ${Vd.call(this)}

            ${n ? D`
                  ${this._renderEntity("Person entity", "main_entity")}
                  ${this._renderEntity("Tracker entity", "tracker_entity")}
                  ${this._renderEntity("ETA entity", "eta_entity")}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_1", { index: 1 })}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_2", { index: 2 })}
                  <div class="color-pair">
                    ${this._renderColor([
		"Accent",
		"Active",
		"Color"
	], "accent_on_color")}
                    ${this._renderColor([
		"Accent",
		"Inactive",
		"Color"
	], "accent_off_color")}
                  </div>
                ` : D`
                  <div class="field">
                    <label>${this._t("Main entity")}</label>

                    ${qa.call(this, {
		value: this._config?.main_entity || "",
		filterOptions: Jd,
		onValueChanged: (e) => this._handleEntityUpdate ? this._handleEntityUpdate("main_entity", e) : this._handleConfigUpdate("main_entity", e)
	})}
                  </div>
                  <div class="color-pair">
                    ${this._renderColor([
		"Accent",
		"Active",
		"Color"
	], "accent_on_color")}
                    ${this._renderColor([
		"Accent",
		"Inactive",
		"Color"
	], "accent_off_color")}
                  </div>
                  ${Gd.call(this)}
                  ${this._renderTemplateInput("State template", "state_template")}
                  ${this._renderTemplateInput("Label template", "label_template")}
                `}

            ${this._config?.main_entity ? J.call(this, {
		interactions: [
			{
				key: "tap_action",
				formKey: "tap_action",
				label: "Tap behavior",
				defaultAction: r,
				defaultVisible: !0
			},
			{
				key: "hold_action",
				formKey: "hold_action",
				label: "Hold behavior",
				defaultAction: "none"
			},
			{
				key: "double_tap_action",
				formKey: "double_tap_action",
				label: "Double tap behavior",
				defaultAction: "none"
			},
			{
				key: "main_entity_tap_action",
				formKey: "icon_tap_action",
				label: "Icon tap behavior",
				defaultAction: a,
				defaultVisible: !0
			},
			{
				key: "main_entity_hold_action",
				formKey: "icon_hold_action",
				label: "Icon hold behavior",
				defaultAction: "none"
			},
			{
				key: "main_entity_double_tap_action",
				formKey: "icon_double_tap_action",
				label: "Icon double tap behavior",
				defaultAction: "none"
			}
		],
		context: {
			entity_id: this._config.main_entity,
			area_id: this._config.area
		}
	}) : ""}
          </div>
        `}
  `;
}
function Vd() {
	return Lo.call(this, {
		label: "Status name",
		valueKey: "status_name",
		entityKey: "main_entity",
		defaultType: "entity"
	});
}
function Hd({ cardActionDefault: e, mainEntityActionDefault: t }) {
	let n = this._getStatusItems(), r = Math.min(this._selectedStatusIndex || 0, n.length - 1), i = n[r] || {}, { itemsPerRow: a, shouldWrapTabs: o, showTabScrollHint: s } = Ld({
		config: this._config,
		itemCount: n.length,
		defaultPerRow: 3
	});
	return D`
    <div class="section">
      ${Rd.call(this, {
		itemCount: n.length,
		classPrefix: "status",
		defaultPerRow: 3
	})}

      <div
        class="status-tabs ${o ? "wrapped" : ""} ${s ? "scroll-hint" : ""} ${n.length > 1 ? "has-tools" : ""}"
        style=${o ? `--status-tabs-per-row: ${a};` : ""}
      >
        <div class="status-tab-items">
          ${n.map((e, t) => D`
            <button
              type="button"
              class="status-tab ${t === r ? "active" : ""}"
              @click=${() => this._selectStatusItem(t)}
            >
              ${t + 1}
            </button>
          `)}
        </div>

        ${s ? D`
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

          <button
            type="button"
            class="status-tool-button"
            title=${this._t("Duplicate")}
            @click=${() => this._duplicateStatusItem(r)}
          >
            <ha-icon icon="mdi:content-copy"></ha-icon>
          </button>

          ${n.length > 1 ? D`
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
        <label>${this._t("Main entity")}</label>

        ${qa.call(this, {
		value: i.entity || "",
		filterOptions: Jd,
		onValueChanged: (e) => this._updateStatusItem(r, { entity: e })
	})}
      </div>

      <div class="color-pair">
        ${Wd.call(this, [
		"Accent",
		"Active",
		"Color"
	], "accent_on_color", r, i)}
        ${Wd.call(this, [
		"Accent",
		"Inactive",
		"Color"
	], "accent_off_color", r, i)}
      </div>

      ${Kd.call(this, r, i)}

      ${Ud.call(this, "State template", "state_template", r, i)}
      ${Ud.call(this, "Label template", "label_template", r, i)}

      ${i.entity ? this._renderStatusItemInteractions(r, i, e, t) : ""}
    </div>
  `;
}
function Ud(e, t, n, r) {
	return this._renderTemplateInput(e, t, {
		value: r[t] || "",
		onValueChanged: (e) => this._updateStatusItem(n, { [t]: e })
	});
}
function Wd(e, t, n, r) {
	return this._renderColorControl(e, `status-${n}-${t}`, r[t] || "", (e) => this._updateStatusItem(n, { [t]: e }));
}
function Gd() {
	return vi.call(this, {
		label: "Icon",
		sourceKey: "main_entity_icon_source",
		entityKey: "main_entity",
		customIconKeys: [
			"main_entity_icon",
			"main_entity_icon_on",
			"main_entity_icon_off"
		],
		renderCustom() {
			return D`
        ${this._renderIconInput("", "main_entity_icon")}
        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "main_entity_icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "main_entity_icon_off")}
        </div>
      `;
		}
	});
}
function Kd(e, t) {
	let n = this, r = {
		hass: this.hass,
		_config: t,
		_t: (e, t) => this._t(e, t),
		_handleConfigUpdate: (t, r) => n._updateStatusItem(e, { [t]: r }),
		_renderIconInput: (t, r) => n._renderStatusItemIconInput(t, r, e)
	};
	return vi.call(r, {
		label: "Icon",
		sourceKey: "main_entity_icon_source",
		entityKey: "entity",
		customIconKeys: [
			"main_entity_icon",
			"main_entity_icon_on",
			"main_entity_icon_off"
		],
		renderCustom() {
			return D`
        ${this._renderIconInput("", "main_entity_icon")}
        <div class="icon-pair">
          ${this._renderIconInput(["Active", "Icon"], "main_entity_icon_on")}
          ${this._renderIconInput(["Inactive", "Icon"], "main_entity_icon_off")}
        </div>
      `;
		}
	});
}
function qd() {
	return [
		{
			label: this._t("Standard"),
			value: "standard"
		},
		{
			label: this._t("Icon only"),
			value: "icon_only"
		},
		{
			label: this._t("Person"),
			value: "person"
		}
	];
}
var Jd, Yd = e((() => {
	M(), ps(), Y(), Wi(), zd(), Jd = [
		{
			label: "All",
			value: "all",
			domains: null
		},
		{
			label: "Binary Sensors",
			haDomains: ["binary_sensor"],
			value: "binary_sensor",
			domains: ["binary_sensor"]
		},
		{
			label: "Sensors",
			haDomains: ["sensor"],
			value: "sensor",
			domains: ["sensor"]
		}
	];
})), Xd, Zd = e((() => {
	M(), Xd = c`
.status-wrap-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 1;
}

.status-per-row-field {
  margin-left: auto;
  width: 128px;
  min-width: 128px;
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
})), Qd = /* @__PURE__ */ t((() => {
	M(), Io(), Yd(), Qs(), Zd(), B(), $u(), Q(), Pt();
	var e = class extends j {
		static svgCache = z;
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
			super.connectedCallback(), wo(this), At(this, "orbit-status-card-dev");
		}
		disconnectedCallback() {
			To(this), super.disconnectedCallback();
		}
		_getColorStyle(e) {
			return Do(e);
		}
		_getColorPickerValue(e) {
			return Oo(e);
		}
		_t(e, t) {
			return X(this.hass, e, t);
		}
		setConfig(e) {
			this._config = e || {}, this._selectedStatusIndex = Math.min(this._selectedStatusIndex || 0, this._getStatusItems(e).length - 1);
		}
		_updateConfig(e) {
			this._config = c(Qi(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
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
				this._updateConfig(K("tracker_entity", a));
				return;
			}
			this._handleConfigUpdate(e, t);
		}
		_clearMainEntity() {
			if (this._config?.mode === "person") {
				this._updateConfig(K("main_entity", i));
				return;
			}
			this._updateConfig(K("main_entity", n));
		}
		_getStatusItems(e = this._config) {
			return Array.isArray(e?.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
				entity: e?.main_entity || "",
				accent_on_color: e?.accent_on_color || "",
				accent_off_color: e?.accent_off_color || "",
				main_entity_icon_source: e?.main_entity_icon_source || "",
				main_entity_icon: e?.main_entity_icon || "",
				main_entity_icon_on: e?.main_entity_icon_on || "",
				main_entity_icon_off: e?.main_entity_icon_off || "",
				state_template: e?.state_template || "",
				label_template: e?.label_template || "",
				tap_action: e?.tap_action,
				hold_action: e?.hold_action,
				double_tap_action: e?.double_tap_action,
				main_entity_tap_action: e?.main_entity_tap_action,
				main_entity_hold_action: e?.main_entity_hold_action,
				main_entity_double_tap_action: e?.main_entity_double_tap_action
			}];
		}
		_selectStatusItem(e) {
			this._selectedStatusIndex = e;
		}
		_addStatusItem() {
			let e = this._getStatusItems();
			this._selectedStatusIndex = e.length, this._updateConfig(G(r, { entities: [...e, { entity: "" }] }));
		}
		_duplicateStatusItem(e) {
			let t = this._getStatusItems(), n = t[e];
			if (!n) return;
			let i = [...t];
			i.splice(e + 1, 0, structuredClone(n)), this._selectedStatusIndex = e + 1, this._updateConfig(G(r, { entities: i }));
		}
		_removeStatusItem(e) {
			let t = this._getStatusItems();
			if (t.length <= 1) {
				this._updateConfig(K("main_entity", n));
				return;
			}
			let r = t.filter((t, n) => n !== e);
			this._selectedStatusIndex = Math.max(0, Math.min(e, r.length - 1)), this._updateConfig({ entities: r });
		}
		_moveStatusItem(e, t) {
			let n = this._getStatusItems(), i = e + t;
			if (i < 0 || i >= n.length) return;
			let a = [...n], [o] = a.splice(e, 1);
			a.splice(i, 0, o), this._selectedStatusIndex = i, this._updateConfig(G(r, { entities: a }));
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
				t.length > 1 && Object.assign(n, G(r)), this._updateConfig(n);
				return;
			}
			if (i.entity === "") {
				this._updateConfig(K("main_entity", n));
				return;
			}
			this._updateConfig({
				main_entity: o.entity || "",
				accent_on_color: o.accent_on_color || "",
				accent_off_color: o.accent_off_color || "",
				main_entity_icon_source: o.main_entity_icon_source || "",
				main_entity_icon: o.main_entity_icon || "",
				main_entity_icon_on: o.main_entity_icon_on || "",
				main_entity_icon_off: o.main_entity_icon_off || "",
				state_template: o.state_template || "",
				label_template: o.label_template || "",
				tap_action: o.tap_action,
				hold_action: o.hold_action,
				double_tap_action: o.double_tap_action,
				main_entity_tap_action: o.main_entity_tap_action,
				main_entity_hold_action: o.main_entity_hold_action,
				main_entity_double_tap_action: o.main_entity_double_tap_action
			});
		}
		_renderInput(e, t, n = "", r = {}) {
			return Ji.call(this, e, t, n, r);
		}
		_renderTemplateInput(e, t, n = {}) {
			return Yi.call(this, e, t, n);
		}
		_renderNumberInput(e, t, n = {}) {
			return Xi.call(this, e, t, n);
		}
		_renderColor(e, t, n) {
			return ra.call(this, e, t, n);
		}
		_renderColorControl(e, t, n, r, i) {
			return ia.call(this, e, t, n, r, i);
		}
		_renderEntity(e, t, n) {
			return yo.call(this, e, t, n);
		}
		_renderStatusItemInteractions(e, t, n, r) {
			let i = {
				hass: this.hass,
				_config: t,
				_t: (e, t) => this._t(e, t),
				requestUpdate: () => this.requestUpdate(),
				_updateConfig: (t) => this._updateStatusItem(e, t)
			};
			return J.call(i, {
				interactions: [
					{
						key: "tap_action",
						formKey: "tap_action",
						label: "Tap behavior",
						defaultAction: n,
						defaultVisible: !0
					},
					{
						key: "hold_action",
						formKey: "hold_action",
						label: "Hold behavior",
						defaultAction: "none"
					},
					{
						key: "double_tap_action",
						formKey: "double_tap_action",
						label: "Double tap behavior",
						defaultAction: "none"
					},
					{
						key: "main_entity_tap_action",
						formKey: "icon_tap_action",
						label: "Icon tap behavior",
						defaultAction: r,
						defaultVisible: !0
					},
					{
						key: "main_entity_hold_action",
						formKey: "icon_hold_action",
						label: "Icon hold behavior",
						defaultAction: "none"
					},
					{
						key: "main_entity_double_tap_action",
						formKey: "icon_double_tap_action",
						label: "Icon double tap behavior",
						defaultAction: "none"
					}
				],
				context: {
					entity_id: t.entity,
					area_id: this._config?.area
				}
			});
		}
		_renderArea(e, t) {
			return bo.call(this, e, t);
		}
		_renderIconInput(e, t, n = "mdi:information-outline or icon.svg") {
			return _i.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return bi.call(this, e);
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
			}), _i.call(a, e, t, r);
		}
		_isImageIcon(e) {
			return hi(e);
		}
		_resolveIconPath(e) {
			return gi(e);
		}
		_getInlineSvg(e) {
			return R.call(this, e, { forceColor: !0 });
		}
		_renderStatusSection() {
			return Bd.call(this);
		}
		render() {
			return D`
      <div class="wrapper">
        ${this._renderStatusSection()}
        <div class="editor-version">
          ${this._t("Orbit Status Card (Dev) v{version}", { version: Z.status })}
        </div>
      </div>
    `;
		}
		static styles = [Zs, Xd];
	};
	customElements.define("orbit-status-card-dev-editor", e);
	function t(e) {
		Object.assign(e, G(n));
	}
	var n = [
		"accent_on_color",
		"accent_off_color",
		"main_entity_icon_source",
		"main_entity_icon",
		"main_entity_icon_on",
		"main_entity_icon_off",
		"state_template",
		"label_template",
		"tap_action",
		"hold_action",
		"double_tap_action",
		"main_entity_tap_action",
		"main_entity_hold_action",
		"main_entity_double_tap_action"
	], r = ["main_entity", ...n], i = [
		"tracker_entity",
		"eta_entity",
		"battery_entity_1",
		"battery_entity_2",
		"accent_on_color",
		"accent_off_color",
		"tap_action",
		"hold_action",
		"double_tap_action",
		"main_entity_tap_action",
		"main_entity_hold_action",
		"main_entity_double_tap_action"
	], a = ["eta_entity"], o = [
		"entity",
		"accent_on_color",
		"accent_off_color",
		"main_entity_icon_source",
		"main_entity_icon",
		"main_entity_icon_on",
		"main_entity_icon_off",
		"main_entity_icon_svg_color_override",
		"main_entity_icon_on_svg_color_override",
		"main_entity_icon_off_svg_color_override",
		"state_template",
		"label_template",
		"tap_action",
		"hold_action",
		"double_tap_action",
		"main_entity_tap_action",
		"main_entity_hold_action",
		"main_entity_double_tap_action"
	], s = /* @__PURE__ */ "type.mode.status_name.main_entity.tracker_entity.eta_entity.battery_entity_1.battery_entity_2.accent_on_color.accent_off_color.main_entity_icon_source.main_entity_icon.main_entity_icon_on.main_entity_icon_off.main_entity_icon_svg_color_override.main_entity_icon_on_svg_color_override.main_entity_icon_off_svg_color_override.state_template.label_template.tap_action.hold_action.double_tap_action.main_entity_tap_action.main_entity_hold_action.main_entity_double_tap_action.wrap.items_per_row.separate_cards.entities.grid_options.view_layout".split(".");
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
})), $d = /* @__PURE__ */ t((() => {
	M(), at(), L(), id(), It(), Vt(), Dn(), jn(), Nn(), Ln(), Vn(), B(), $u(), wd(), Pd(), Id(), Qd(), Q();
	var e = class extends j {
		static svgCache = z;
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
			return document.createElement("orbit-status-card-dev-editor");
		}
		static getStubConfig() {
			return {
				type: "custom:orbit-status-card-dev",
				mode: "standard",
				main_entity: ""
			};
		}
		getLayoutOptions() {
			if (this._config?.mode === "icon_only") {
				let e = gd(this._config).length, n = t(this._config, e);
				return {
					grid_columns: Math.max(1, n),
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
			return hd.call(this, e);
		}
		shouldUpdate(e) {
			return Pn.call(this, e, this._getRelevantEntities(), {
				hasTemplates: Fn(this._config),
				includeZones: this._config?.mode === "person"
			});
		}
		_handleAction(e, t = null) {
			return Ue.call(this, e, t);
		}
		_handleTap(e) {
			if (!P(this)) {
				if (this._shouldSuppressMainIconTap(e)) {
					this._stopEvent(e);
					return;
				}
				if (this._isMainIconEvent(e)) {
					this._handleMainEntityTap(e);
					return;
				}
				F.call(this, e, this._config.main_entity, this._getCardTapAction(), this._getCardDoubleTapAction());
			}
		}
		_handleDoubleTap(e) {
			if (this._isMainIconEvent(e)) {
				this._handleMainEntityDoubleTap(e);
				return;
			}
			I.call(this, e, this._config.main_entity, this._getCardDoubleTapAction());
		}
		_isMainIconEvent(e) {
			if (e.composedPath().some((e) => e?.classList && (e.classList.contains("circle") || e.classList.contains("status-circle") || e.classList.contains("main-icon") || e.classList.contains("main-image-icon")))) return !0;
			let t = (this.shadowRoot?.querySelector(".status-circle"))?.getBoundingClientRect();
			return t ? e.clientX >= t.left && e.clientX <= t.right && e.clientY >= t.top && e.clientY <= t.bottom : !1;
		}
		_handleMainEntityTap(e) {
			if (P(this)) return;
			if (this._shouldSuppressMainIconTap(e)) {
				this._stopEvent(e);
				return;
			}
			if (this._longPressTriggered) {
				this._longPressTriggered = !1, this._stopEvent(e);
				return;
			}
			let t = this._config.main_entity;
			t && F.call(this, e, t, this._getMainEntityTapAction() || this._getCardTapAction(), this._getMainEntityDoubleTapAction());
		}
		_handleMainEntityDoubleTap(e) {
			I.call(this, e, this._config.main_entity, this._getMainEntityDoubleTapAction());
		}
		_handleCardTapAction() {
			let e = this._getCardTapAction(), t = this._config.main_entity;
			if (e.action && e.action !== "navigate") {
				this._handleAction(e, t);
				return;
			}
			this._navigate(e.navigation_path || this._navigationPath || "/lovelace/home");
		}
		_handleCardPointerDown(e) {
			if (P(this) || this._isMainIconEvent(e)) return;
			this._stopEvent(e), this._clearStatusItemHoldTimer();
			let t = this._getCardHoldAction();
			t && (this._statusItemHoldTimer = setTimeout(() => {
				this._statusItemLongPressTriggered = !0, this._handleAction(t, this._config.main_entity);
			}, this._LONG_PRESS_DELAY));
		}
		_handleCardPointerUp(e) {
			this._isMainIconEvent(e) || (this._stopEvent(e), this._clearStatusItemHoldTimer());
		}
		_handleCardPointerCancel(e) {
			this._isMainIconEvent(e) || (this._stopEvent(e), this._clearStatusItemHoldTimer());
		}
		_handleCardContextMenu(e) {
			if (this._isMainIconEvent(e)) return;
			this._stopEvent(e);
			let t = this._getCardHoldAction();
			t && (this._clearStatusItemHoldTimer(), this._statusItemLongPressTriggered = !0, this._handleAction(t, this._config.main_entity));
		}
		_handleStatusItemClick(e, t = 0) {
			if (this._statusItemLongPressTriggered) {
				this._statusItemLongPressTriggered = !1, this._stopEvent(e);
				return;
			}
			let n = this._getStatusItemEntityId(t);
			if (!n) return;
			let r = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityTapAction(t) : this._getStatusItemCardTapAction(t), i = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityDoubleTapAction(t) : this._getStatusItemCardDoubleTapAction(t);
			F.call(this, e, n, r?.action ? r : { action: "more-info" }, i);
		}
		_handleStatusItemDoubleClick(e, t = 0) {
			I.call(this, e, this._getStatusItemEntityId(t), this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityDoubleTapAction(t) : this._getStatusItemCardDoubleTapAction(t));
		}
		_handleStatusItemPointerDown(e, t = 0) {
			if (P(this)) return;
			this._stopEvent(e), this._clearStatusItemHoldTimer();
			let n = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityHoldAction(t) : this._getStatusItemCardHoldAction(t);
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
			let n = this._isStatusItemMainIconEvent(e) ? this._getStatusItemMainEntityHoldAction(t) : this._getStatusItemCardHoldAction(t);
			n && (this._clearStatusItemHoldTimer(), this._statusItemLongPressTriggered = !0, this._handleAction(n, this._getStatusItemEntityId(t)));
		}
		_navigate(e) {
			return qe.call(this, e);
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
			return ot.call(this, e);
		}
		_computeIconColor(e) {
			return st.call(this, e);
		}
		_computeCircleColor(e) {
			return ct.call(this, e);
		}
		_getMainStateObj() {
			let e = this._config.main_entity;
			return e && this.hass ? this.hass.states[e] : null;
		}
		formatState(e) {
			return zt(e);
		}
		_getEntityActiveState(e) {
			return Bt(e);
		}
		_isImageIcon(e) {
			return yn(e);
		}
		_resolveIconPath(e) {
			return bn(e);
		}
		_getInlineSvg(e, t = !0) {
			return R.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e, t) {
			return xn(e, t);
		}
		_evaluateStateTemplate(e, t) {
			return Mn.call(this, e, t);
		}
		_getRelevantEntities() {
			return this._config?.mode === "icon_only" ? gd(this._config).map((e) => e.entity || e.main_entity) : [
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
			if (P(this)) return;
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
		_clearDoubleTapTimer() {
			return We.call(this);
		}
		_getCardHoldAction() {
			return N(this._config.hold_action) ? this._config.hold_action : null;
		}
		_getCardDoubleTapAction() {
			return N(this._config.double_tap_action) ? this._config.double_tap_action : null;
		}
		_getMainEntityHoldAction() {
			return N(this._config.main_entity_hold_action) ? this._config.main_entity_hold_action : null;
		}
		_getMainEntityTapAction() {
			let e = this._config.main_entity_tap_action;
			return e?.action === "none" ? null : e?.action ? e : this._isIconOnlyMode() || this._isPersonMode() ? null : { action: "more-info" };
		}
		_getMainEntityDoubleTapAction() {
			return N(this._config.main_entity_double_tap_action) ? this._config.main_entity_double_tap_action : null;
		}
		_getCardTapAction() {
			let e = {
				action: this._isIconOnlyMode() || this._isPersonMode() ? "more-info" : "navigate",
				navigation_path: this._navigationPath || "/lovelace/home"
			}, t = this._config.tap_action;
			return t?.action ? t : e;
		}
		_getStatusItemCardTapAction(e = 0) {
			let t = this._statusItems?.[e];
			return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : { action: "more-info" };
		}
		_getStatusItemCardHoldAction(e = 0) {
			let t = this._statusItems?.[e];
			return N(t?.hold_action) ? t.hold_action : N(this._config.hold_action) ? this._config.hold_action : null;
		}
		_getStatusItemCardDoubleTapAction(e = 0) {
			let t = this._statusItems?.[e];
			return N(t?.double_tap_action) ? t.double_tap_action : N(this._config.double_tap_action) ? this._config.double_tap_action : null;
		}
		_getStatusItemMainEntityTapAction(e = 0) {
			let t = this._statusItems?.[e];
			return t?.main_entity_tap_action?.action && t.main_entity_tap_action.action !== "none" ? t.main_entity_tap_action : this._config.main_entity_tap_action?.action && this._config.main_entity_tap_action.action !== "none" ? this._config.main_entity_tap_action : this._getStatusItemCardTapAction(e);
		}
		_getStatusItemMainEntityDoubleTapAction(e = 0) {
			let t = this._statusItems?.[e];
			return N(t?.main_entity_double_tap_action) ? t.main_entity_double_tap_action : N(this._config.main_entity_double_tap_action) ? this._config.main_entity_double_tap_action : null;
		}
		_getStatusItemMainEntityHoldAction(e = 0) {
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
			return t(this._config, e);
		}
		_getStatusRowCount(e = this._statusItems?.length || 1) {
			return n(this._config, e);
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
			return Td.call(this);
		}
		static styles = Fd;
	};
	function t(e = {}, t = 1) {
		return nd({
			config: e,
			count: t,
			perRowKey: "items_per_row"
		});
	}
	function n(e = {}, t = 1) {
		return rd({
			config: e,
			count: t,
			perRowKey: "items_per_row"
		});
	}
	Ft({
		tag: "orbit-status-card-dev",
		cardClass: e,
		name: "Orbit Status Card (Dev)",
		description: "Responsive status card",
		version: Z.status,
		getEntitySuggestion: i
	});
	var r = new Set([
		"automation",
		"button",
		"input_button",
		"scene",
		"script"
	]);
	function i(e, t) {
		let n = Rn(t);
		if (n === "person") return { config: {
			type: "custom:orbit-status-card-dev",
			mode: "person",
			main_entity: t
		} };
		if (r.has(n)) return null;
		let i = {
			label: X(e, "Standard"),
			config: {
				type: "custom:orbit-status-card-dev",
				mode: "standard",
				main_entity: t
			}
		};
		return Bn(e, t) ? [i, {
			label: X(e, "Icon only"),
			config: {
				type: "custom:orbit-status-card-dev",
				mode: "icon_only",
				main_entity: t
			}
		}] : { config: i.config };
	}
}));
//#endregion
//#region src/cards/action/helpers/lifecycle.js
function ef(e) {
	!e.has("_config") && !e.has("hass") || (this._actions = tf(this._config).map((e) => nf.call(this, e)));
}
function tf(e = {}) {
	return Array.isArray(e.entities) && e.entities.length ? e.entities.map((e) => typeof e == "string" ? { entity: e } : e || {}) : [{
		entity: e.main_entity,
		accent_color: e.accent_color,
		main_entity_icon_source: e.main_entity_icon_source,
		main_entity_icon: e.main_entity_icon,
		main_entity_icon_svg_color_override: e.main_entity_icon_svg_color_override,
		tap_action: e.tap_action,
		hold_action: e.hold_action,
		double_tap_action: e.double_tap_action
	}];
}
function nf(e) {
	let t = e.entity || e.main_entity, n = t && this.hass ? this.hass.states[t] : null, r = e.accent_color || this._config.accent_color || "theme", i = af(n), a = this._computeCircleColor(r), o = i ? this._computeFullColor(r) : this._computeIconColor(r), s = rf(e, t), c = s === "custom" && (e.main_entity_icon || e.icon) || "", l = s === "custom" && e.main_entity_icon ? "main_entity_icon" : s === "custom" && e.icon ? "icon" : "", u = c || "mdi:play-circle";
	return {
		...e,
		entityId: t,
		stateObj: n,
		useStateIcon: !!n && !c,
		icon: u,
		iconColor: o,
		cardBackground: a,
		isRunning: i,
		svgForceColor: l ? this._getSvgColorOverride(e, l) : !0
	};
}
function rf(e, t) {
	let n = e.main_entity_icon_source, r = !!t, i = !!(e.main_entity_icon || e.icon);
	return n === "custom" ? "custom" : n === "entity" && r ? "entity" : i ? "custom" : "entity";
}
function af(e) {
	if (!e) return !1;
	let t = e.entity_id?.split(".")[0], n = Number(e.attributes?.current);
	return Number.isFinite(n) && n > 0 ? !0 : t === "script" && e.state === "on";
}
var of = e((() => {}));
//#endregion
//#region src/cards/action/renders/action-card.js
function sf() {
	let e = this._actions || [], t = Math.max(e.length, 1), n = this._getActionColumnCount(t), r = this._getActionRowCount(t), i = lf(e, n);
	return D`
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
        ${i.map((e, t) => D`
          <div class="action-row">
            ${e.map((e, r) => cf.call(this, e, t * n + r))}
            ${uf(e.length, n, "action-spacer")}
          </div>
        `)}
      </div>
    </ha-card>
  `;
}
function cf(e, t) {
	let n = this._isImageIcon(e.icon) ? this._resolveIconPath(e.icon) : "", r = n ? this._getInlineSvg(n, e.svgForceColor) : "", i = D`
    <div class="circle action-circle">
      ${this._isImageIcon(e.icon) ? D`
            <div class="main-image-icon">
              ${r ? V(r) : D`<img src=${n} alt="" />`}
            </div>
          ` : e.useStateIcon && e.stateObj ? D`
            <ha-state-icon
              class="main-icon"
              .stateObj=${e.stateObj}
            ></ha-state-icon>
          ` : D`
            <ha-icon
              class="main-icon"
              .icon=${e.icon}
            ></ha-icon>
          `}
    </div>
  `;
	return (this._actions?.length || 0) > 1 && !this._config?.separate_cards ? D`
      <div
        class="action-button ${e.isRunning ? "running" : ""}"
        role="button"
        tabindex="0"
        style="
          --action-card-background:${e.cardBackground};
          --action-icon-color:${e.iconColor};
        "
        @click=${(e) => this._handleTap(e, t)}
        @dblclick=${(e) => this._handleDoubleTap(e, t)}
        @pointerdown=${(e) => this._handlePointerDown(e, t)}
        @pointerup=${this._handlePointerUp}
        @pointerleave=${this._handlePointerCancel}
        @pointercancel=${this._handlePointerCancel}
        @contextmenu=${(e) => this._handleContextMenu(e, t)}
      >
        ${i}
      </div>
    ` : D`
    <ha-card
      class="action-button ${e.isRunning ? "running" : ""}"
      role="button"
      tabindex="0"
      style="
        --action-card-background:${e.cardBackground};
        --action-icon-color:${e.iconColor};
      "
      @click=${(e) => this._handleTap(e, t)}
      @dblclick=${(e) => this._handleDoubleTap(e, t)}
      @pointerdown=${(e) => this._handlePointerDown(e, t)}
      @pointerup=${this._handlePointerUp}
      @pointerleave=${this._handlePointerCancel}
      @pointercancel=${this._handlePointerCancel}
      @contextmenu=${(e) => this._handleContextMenu(e, t)}
    >
      ${i}
    </ha-card>
  `;
}
function lf(e, t = 1) {
	let n = Math.max(1, t), r = [];
	for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
	return r;
}
function uf(e, t, n) {
	let r = Math.max(0, t - e);
	return Array.from({ length: r }, () => D`
    <div class=${n}></div>
  `);
}
var df = e((() => {
	M(), H();
})), ff, pf = e((() => {
	M(), Wr(), Kr(), ff = [
		Ur,
		Gr,
		c`
    ha-card {
      aspect-ratio: 0.94 / 1;
      border-radius: 15px;
    }

    ha-card.grouped {
      --orbit-grouped-item-gap: clamp(5px, 1.4cqw, 8px);
      aspect-ratio: auto;
      container-type: inline-size;
    }

    ha-card.grouped:not(.separate-cards) {
      background: var(--ha-card-background, var(--card-background-color, #1a1a1a));
      overflow: hidden;
    }

    ha-card.grouped.separate-cards {
      background: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      border: var(--ha-card-border-width, 1px) solid transparent;
      box-shadow: none;
      overflow: visible;
    }

    .action-container {
      display: flex;
      flex-direction: column;
      gap: var(--orbit-grouped-item-gap);
      height: auto;
      padding: 0;
      box-sizing: border-box;
    }

    .action-row {
      display: flex;
      flex: 1 1 auto;
      gap: var(--orbit-grouped-item-gap);
      min-height: 0;
      width: 100%;
    }

    ha-card.grouped .action-row {
      flex: 0 0 auto;
    }

    .action-button {
      border-radius: 15px;
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: flex;
      flex: 1 1 0;
      align-items: center;
      justify-content: center;
      min-width: 0;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .action-spacer {
      flex: 1 1 0;
      min-width: 0;
      visibility: hidden;
      pointer-events: none;
    }

    ha-card.grouped .action-button {
      aspect-ratio: 0.94 / 1;
      height: auto;
    }

    ha-card.grouped:not(.separate-cards) .action-button {
      --ha-card-background: transparent;
      --card-background-color: transparent;
      background: transparent !important;
      border: var(--ha-card-border-width, 1px) solid transparent;
      box-shadow: none;
    }

    ha-card.grouped .action-spacer {
      aspect-ratio: 0.94 / 1;
    }

    ha-card.grouped.separate-cards .action-button {
      border-radius: 15px;
      overflow: hidden;
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
      --orbit-main-icon-size: 58%;
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
function mf() {
	let e = this._getActionItems(), t = Math.min(this._selectedActionIndex || 0, e.length - 1), n = e[t] || {}, r = this._actionEntityDomainFilter || "all", { itemsPerRow: i, shouldWrapTabs: a, showTabScrollHint: o } = Ld({
		config: this._config,
		itemCount: e.length,
		perRowKey: "actions_per_row",
		defaultPerRow: 3
	});
	return D`
    <div class="section">
      ${Rd.call(this, {
		itemCount: e.length,
		classPrefix: "action",
		perRowKey: "actions_per_row",
		perRowLabel: "Actions per row",
		defaultPerRow: 3
	})}

      <div
        class="action-tabs ${a ? "wrapped" : ""} ${o ? "scroll-hint" : ""} ${e.length > 1 ? "has-tools" : ""}"
        style=${a ? `--action-tabs-per-row: ${i};` : ""}
      >
        <div class="action-tab-items">
          ${e.map((e, n) => D`
            <button
              type="button"
              class="action-tab ${n === t ? "active" : ""}"
              @click=${() => this._selectActionItem(n)}
            >
              ${n + 1}
            </button>
          `)}
        </div>

        ${o ? D`
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

          ${e.length > 1 ? D`
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
        <label>${this._t("Main entity")}</label>

        ${qa.call(this, {
		value: n.entity || "",
		filterOptions: gf,
		activeFilter: r,
		onValueChanged: (e) => this._updateActionItem(t, { entity: e })
	})}
      </div>

      ${this._renderColorControl(["Accent", "Color"], `action-${t}-accent_color`, n.accent_color || "", (e) => this._updateActionItem(t, { accent_color: e }), this._config?.accent_color || "theme")}

      ${hf.call(this, t, n)}

      ${n.entity ? this._renderActionItemInteractions(t, n) : ""}
    </div>
  `;
}
function hf(e, t) {
	let n = this, r = {
		hass: this.hass,
		_config: t,
		_t: (e, t) => this._t(e, t),
		_handleConfigUpdate: (t, r) => n._updateActionItem(e, { [t]: r }),
		_renderIconInput: (t, r) => n._renderActionItemIconInput(t, r, e)
	};
	return vi.call(r, {
		label: "Icon",
		sourceKey: "main_entity_icon_source",
		entityKey: "entity",
		customIconKeys: ["main_entity_icon"],
		renderCustom() {
			return this._renderIconInput("", "main_entity_icon");
		}
	});
}
var gf, _f = e((() => {
	M(), Y(), Wi(), zd(), gf = [
		{
			label: "All",
			value: "all",
			domains: null
		},
		{
			label: "Automations",
			haDomains: ["automation"],
			value: "automation",
			domains: ["automation"]
		},
		{
			label: "Buttons",
			haDomains: ["button"],
			value: "button",
			domains: [
				"button",
				"input_button",
				"input_boolean"
			]
		},
		{
			label: "Cameras",
			haDomains: ["camera"],
			value: "camera",
			domains: ["camera"]
		},
		{
			label: "Scenes",
			haDomains: ["scene"],
			value: "scene",
			domains: ["scene"]
		},
		{
			label: "Scripts",
			haDomains: ["script"],
			value: "script",
			domains: ["script"]
		}
	];
})), vf, yf = e((() => {
	M(), vf = c`
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
  margin-left: auto;
  width: 144px;
  min-width: 144px;
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
})), bf = /* @__PURE__ */ t((() => {
	M(), Io(), _f(), Qs(), yf(), B(), Gn(), $u(), Q(), Pt();
	var e = class extends j {
		static svgCache = z;
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
			super.connectedCallback(), wo(this), At(this, "orbit-action-card-dev");
		}
		disconnectedCallback() {
			To(this), super.disconnectedCallback();
		}
		setConfig(e) {
			this._config = e || {}, this._selectedActionIndex = Math.min(this._selectedActionIndex || 0, this._getActionItems(e).length - 1);
		}
		_t(e, t) {
			return X(this.hass, e, t);
		}
		_updateConfig(e) {
			this._config = o(Qi(this._config, e)), this.dispatchEvent(new CustomEvent("config-changed", {
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
				main_entity_icon_source: e?.main_entity_icon_source || "",
				main_entity_icon: e?.main_entity_icon || "",
				tap_action: e?.tap_action,
				hold_action: e?.hold_action,
				double_tap_action: e?.double_tap_action
			}];
		}
		_selectActionItem(e) {
			this._selectedActionIndex = e;
		}
		_addActionItem() {
			let e = this._getActionItems();
			this._selectedActionIndex = e.length, this._updateConfig(G(r, { entities: [...e, { entity: "" }] }));
		}
		_removeActionItem(e) {
			let t = this._getActionItems();
			if (t.length <= 1) {
				this._updateConfig(K("main_entity", n));
				return;
			}
			let r = t.filter((t, n) => n !== e);
			this._selectedActionIndex = Math.max(0, Math.min(e, r.length - 1)), this._updateConfig({ entities: r });
		}
		_moveActionItem(e, t) {
			let n = this._getActionItems(), i = e + t;
			if (i < 0 || i >= n.length) return;
			let a = [...n], [o] = a.splice(e, 1);
			a.splice(i, 0, o), this._selectedActionIndex = i, this._updateConfig(G(r, { entities: a }));
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
				t.length > 1 && Object.assign(n, G(r)), this._updateConfig(n);
				return;
			}
			if (i.entity === "") {
				this._updateConfig(K("main_entity", n));
				return;
			}
			this._updateConfig({
				main_entity: o.entity || "",
				accent_color: o.accent_color || "",
				main_entity_icon_source: o.main_entity_icon_source || "",
				main_entity_icon: o.main_entity_icon || "",
				tap_action: o.tap_action,
				hold_action: o.hold_action,
				double_tap_action: o.double_tap_action
			});
		}
		_getColorStyle(e) {
			return Do(e);
		}
		_getColorPickerValue(e) {
			return Oo(e);
		}
		_renderActionItemInteractions(e, t) {
			let n = {
				hass: this.hass,
				_config: t,
				_t: (e, t) => this._t(e, t),
				requestUpdate: () => this.requestUpdate(),
				_updateConfig: (t) => this._updateActionItem(e, t)
			};
			return J.call(n, {
				interactions: [
					{
						key: "tap_action",
						formKey: "tap_action",
						label: "Tap behavior",
						defaultAction: Hn(t.entity, "toggle"),
						defaultVisible: !0
					},
					{
						key: "hold_action",
						formKey: "hold_action",
						label: "Hold behavior",
						defaultAction: "more-info"
					},
					{
						key: "double_tap_action",
						formKey: "double_tap_action",
						label: "Double tap behavior",
						defaultAction: "none"
					}
				],
				context: { entity_id: t.entity }
			});
		}
		_renderColor(e, t, n) {
			return ra.call(this, e, t, n);
		}
		_renderColorControl(e, t, n, r, i) {
			return ia.call(this, e, t, n, r, i);
		}
		_renderEntity(e, t, n) {
			return yo.call(this, e, t, n);
		}
		_renderNumberInput(e, t, n = {}) {
			return Xi.call(this, e, t, n);
		}
		_renderIconInput(e, t, n = "mdi:palette or icon.svg") {
			return _i.call(this, e, t, n);
		}
		_loadLocalIconFiles(e = "") {
			return bi.call(this, e);
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
			}), _i.call(a, e, t, r);
		}
		_isImageIcon(e) {
			return hi(e);
		}
		_resolveIconPath(e) {
			return gi(e);
		}
		_getInlineSvg(e) {
			return R.call(this, e, { forceColor: !0 });
		}
		_renderActionSection() {
			return mf.call(this);
		}
		render() {
			return D`
      <div class="wrapper">
        ${this._renderActionSection()}
        <div class="editor-version">
          ${this._t("Orbit Action Card (Dev) v{version}", { version: Z.action })}
        </div>
      </div>
    `;
		}
		static styles = [Zs, vf];
	};
	customElements.define("orbit-action-card-dev-editor", e);
	function t(e) {
		Object.assign(e, G(n));
	}
	var n = [
		"accent_color",
		"main_entity_icon_source",
		"main_entity_icon",
		"tap_action",
		"hold_action",
		"double_tap_action"
	], r = ["main_entity", ...n], i = [
		"entity",
		"accent_color",
		"main_entity_icon_source",
		"main_entity_icon",
		"main_entity_icon_svg_color_override",
		"tap_action",
		"hold_action",
		"double_tap_action"
	], a = [
		"type",
		"main_entity",
		"accent_color",
		"main_entity_icon_source",
		"main_entity_icon",
		"main_entity_icon_svg_color_override",
		"tap_action",
		"hold_action",
		"double_tap_action",
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
})), xf = /* @__PURE__ */ t((() => {
	M(), at(), Gn(), L(), id(), It(), Dn(), Ln(), Vn(), B(), of(), df(), pf(), bf(), Q();
	var e = class extends j {
		static svgCache = z;
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
			return document.createElement("orbit-action-card-dev-editor");
		}
		static getStubConfig() {
			return {
				type: "custom:orbit-action-card-dev",
				main_entity: "",
				accent_color: "theme"
			};
		}
		getLayoutOptions() {
			let e = tf(this._config).length, n = t(this._config, e);
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
			return ef.call(this, e);
		}
		shouldUpdate(e) {
			return Pn.call(this, e, tf(this._config).map((e) => e.entity || e.main_entity), { hasTemplates: Fn(this._config) });
		}
		_handleTap(e, t = 0) {
			if (this._longPressTriggered) {
				this._longPressTriggered = !1, this._stopEvent(e);
				return;
			}
			F.call(this, e, this._getActionEntityId(t), this._getTapAction(t), this._getDoubleTapAction(t));
		}
		_handleDoubleTap(e, t = 0) {
			I.call(this, e, this._getActionEntityId(t), this._getDoubleTapAction(t));
		}
		_clearDoubleTapTimer() {
			return We.call(this);
		}
		_getDoubleTapAction(e = 0) {
			let t = this._actions?.[e];
			return t?.double_tap_action?.action ? t.double_tap_action : this._config.double_tap_action?.action ? this._config.double_tap_action : null;
		}
		_handlePointerDown(e, t = 0) {
			P(this) || (this._stopEvent(e), this._clearHoldTimer(), this._holdTimer = setTimeout(() => {
				this._longPressTriggered = !0, this._handleAction(this._getHoldAction(t), this._getActionEntityId(t));
			}, 500));
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
			return t?.tap_action?.action ? t.tap_action : this._config.tap_action?.action ? this._config.tap_action : Hn(this._getActionEntityId(e), "toggle");
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
			return rd({
				config: this._config,
				count: e,
				perRowKey: "actions_per_row"
			});
		}
		_handleAction(e, t = null) {
			return Ue.call(this, e, t);
		}
		_computeFullColor(e) {
			return ot.call(this, e);
		}
		_computeIconColor(e) {
			return st.call(this, e);
		}
		_computeCircleColor(e) {
			return ct.call(this, e);
		}
		_isImageIcon(e) {
			return yn(e);
		}
		_resolveIconPath(e) {
			return bn(e);
		}
		_getInlineSvg(e, t = !0) {
			return R.call(this, e, { forceColor: t });
		}
		_getSvgColorOverride(e, t) {
			return xn(e, t);
		}
		_clearHoldTimer() {
			this._holdTimer &&= (clearTimeout(this._holdTimer), null);
		}
		_stopEvent(e) {
			e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation();
		}
		render() {
			return sf.call(this);
		}
		static styles = ff;
	};
	function t(e = {}, t = 1) {
		return nd({
			config: e,
			count: t,
			perRowKey: "actions_per_row"
		});
	}
	Ft({
		tag: "orbit-action-card-dev",
		cardClass: e,
		name: "Orbit Action Card (Dev)",
		description: "Compact scene, script, and automation launcher",
		version: Z.action,
		getEntitySuggestion: r
	});
	var n = new Set([
		"automation",
		"button",
		"input_button",
		"scene",
		"script"
	]);
	function r(e, t) {
		return n.has(Rn(t)) ? { config: {
			type: "custom:orbit-action-card-dev",
			main_entity: t
		} } : null;
	}
}));
//#endregion
//#region src/common/helpers/deck-padding.js
function Sf(e = {}) {
	let t = e?.attributes || {};
	return {
		top: Of(t.padding_top),
		right: Of(t.padding_right),
		bottom: Of(t.padding_bottom),
		left: Of(t.padding_left)
	};
}
function Cf(e = {}) {
	return Object.values(Sf(e)).some(Boolean);
}
function wf(e = {}) {
	return e?.attributes?.force_padding === !0;
}
function Tf(e = {}) {
	return Cf(e) && (wf(e) || !Df(e?.card));
}
function Ef(e = {}) {
	return wf(e) && Cf(e);
}
function Df(e) {
	return Array.isArray(e) ? e.some((e) => Df(e)) : !e || typeof e != "object" ? typeof e == "string" ? /\bpadding(?:-(?:top|right|bottom|left))?\b/i.test(e) : !1 : Object.entries(e).some(([e, t]) => e.toLowerCase().includes("padding") || Df(t));
}
function Of(e) {
	if (e == null || e === "") return "";
	let t = e.toString().trim();
	return t ? /^-?\d+(\.\d+)?$/.test(t) ? `${t}px` : t : "";
}
var kf = e((() => {})), Af, jf = e((() => {
	M(), Af = c`
  ha-card.deck-card {
    border-radius: var(--ha-card-border-radius, 15px);
    overflow: visible;
  }

  ha-card.deck-card.wrap.separate-cards {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: none;
    box-shadow: none;
  }

  ha-card.deck-card.overlay {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: none;
    box-shadow: none;
  }

  ha-card.deck-card.wrap:not(.separate-cards) .deck-item,
  ha-card.deck-card.wrap:not(.separate-cards) .deck-item > *,
  ha-card.deck-card.wrap:not(.separate-cards) .deck-item-interaction > * {
    --ha-card-background: transparent;
    --card-background-color: transparent;
    --ha-card-box-shadow: none;
    --ha-card-border-color: transparent;
    --ha-card-backdrop-filter: none;
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-color: transparent;
    box-shadow: none;
  }

  .deck-card.empty {
    min-height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color);
  }

  .deck-wrap {
    display: flex;
    flex-direction: column;
    gap: var(--orbit-deck-gap, 8px);
    padding: var(--orbit-deck-padding, 0);
  }

  .deck-row {
    display: flex;
    gap: var(--orbit-deck-gap, 8px);
    width: 100%;
  }

  .deck-item,
  .deck-spacer {
    flex: 1 1 0;
    min-width: 0;
  }

  .deck-item-interaction {
    display: block;
    height: 100%;
  }

  .deck-item-interaction.has-actions {
    cursor: pointer;
  }

  .deck-spacer {
    visibility: hidden;
    pointer-events: none;
  }

  .deck-tabs {
    display: flex;
    align-items: end;
    gap: 4px;
    border-bottom: none;
    box-shadow: inset 0 -2px 0 var(--divider-color);
    background: var(--orbit-deck-tab-background-color, transparent);
    overflow-x: auto;
  }

  .deck-tab {
    position: relative;
    min-width: 72px;
    min-height: 44px;
    border: none;
    border-bottom: 3px solid transparent;
    background: transparent;
    color: var(--orbit-deck-tab-color, inherit);
    padding: 0 12px;
    font: inherit;
    font-size: var(--orbit-deck-tab-font-size, var(--ha-font-size-m, 14px));
    font-weight: var(--ha-font-weight-medium, 500);
    opacity: 0.62;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
  }

  .deck-card.tabs:not(.hide-tab-dividers) .deck-tab + .deck-tab::before {
    content: "";
    position: absolute;
    inset-inline-start: -3px;
    top: 8px;
    bottom: 0;
    width: 2px;
    background: var(--divider-color);
    pointer-events: none;
  }

  .deck-card.tabs.tab-width-equal .deck-tab {
    flex: 1 1 0;
    min-width: 0;
  }

  .deck-card.tabs.tab-width-dynamic .deck-tab {
    flex: 0 0 auto;
  }

  .deck-card.tabs.tab-width-custom .deck-tab {
    flex: 0 0 var(--orbit-deck-tab-width, 120px);
    min-width: var(--orbit-deck-tab-width, 120px);
  }

  .deck-tab.active {
    color: var(--orbit-deck-tab-active-color, var(--primary-color));
    border-bottom-color: var(--orbit-deck-tab-active-color, var(--primary-color));
    opacity: 1;
  }

  .deck-tab ha-icon {
    --mdc-icon-size: 20px;
  }

  .deck-tab-content {
    padding-top: var(--orbit-deck-gap, 8px);
  }

  .deck-overlay {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 15px);
  }

  .deck-overlay-main {
    position: relative;
    z-index: 0;
  }

  .deck-overlay-item {
    position: absolute;
    inset-inline-start: var(--orbit-deck-overlay-left, 0);
    top: var(--orbit-deck-overlay-top, 0);
    z-index: var(--orbit-deck-overlay-z-index, 1);
    flex: 0 0 auto;
    pointer-events: auto;
  }

  .deck-overlay-item.overlay-card {
    width: 100%;
  }

  .deck-overlay-item.overlay-badge {
    width: max-content;
  }

  .deck-overlay-content {
    display: block;
    transform-origin: top left;
  }

  .deck-overlay-item .deck-item-interaction {
    height: auto;
  }

  .deck-overlay-item.transparent-background,
  .deck-overlay-item.transparent-background .deck-overlay-content,
  .deck-overlay-item.transparent-background .deck-item-interaction,
  .deck-overlay-item.transparent-background .deck-item-interaction > * {
    --ha-card-background: transparent;
    --card-background-color: transparent;
    --ha-card-box-shadow: none;
    --ha-card-border-width: 0;
    --ha-card-border-color: transparent;
    --ha-card-backdrop-filter: none;
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-color: transparent;
    box-shadow: none;
  }

  .deck-error-card {
    padding: 16px;
    background: color-mix(in srgb, var(--error-color) 14%, transparent);
    color: var(--primary-text-color);
  }

  .deck-error-title {
    font-weight: var(--ha-font-weight-bold, 700);
    margin-bottom: 8px;
  }
`;
}));
//#endregion
//#region src/editors/deck-card-editor.js
function Mf(e) {
	let t = {}, n = /* @__PURE__ */ new Set();
	return Uf.forEach((r) => {
		Object.prototype.hasOwnProperty.call(e, r) && (t[r] = r === "decks" && Array.isArray(e[r]) ? e[r].map(Pf) : e[r], n.add(r));
	}), Object.keys(e).forEach((r) => {
		n.has(r) || (t[r] = e[r]);
	}), t;
}
function Nf(e) {
	if (!Array.isArray(e?.decks)) return {
		config: e,
		changed: !1
	};
	let t = !1, n = e.decks.map((e) => {
		let n = e?.attributes || {};
		if (!Object.prototype.hasOwnProperty.call(n, "label")) return e;
		t = !0;
		let { label: r, ...i } = n;
		return {
			...e,
			attributes: {
				...i,
				name: n.name || r
			}
		};
	});
	return t ? {
		config: {
			...e,
			decks: n
		},
		changed: t
	} : {
		config: e,
		changed: t
	};
}
function Pf(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return e;
	let t = {}, n = /* @__PURE__ */ new Set(), r = {
		...e,
		attributes: Ff(e.attributes || {})
	};
	return e.badge?.type ? (r.badge = e.badge, delete r.card) : e.card?.type ? (r.card = e.card, delete r.badge) : (delete r.badge, delete r.card), Wf.forEach((e) => {
		Object.prototype.hasOwnProperty.call(r, e) && (t[e] = r[e], n.add(e));
	}), Object.keys(r).forEach((e) => {
		n.has(e) || (t[e] = r[e]);
	}), t;
}
function Ff(e = {}) {
	return Object.entries(e).reduce((e, [t, n]) => (n !== void 0 && n !== "" && (e[t] = n), e), {});
}
function If(e = {}, t) {
	let n = Rf(e);
	return n?.[t]?.action ? n[t] : t === "tap_action" && n?.entity ? "more-info" : "none";
}
function Lf(e = {}) {
	return e?.badge ? {
		attributes: e.attributes || {},
		badge: e.badge || {}
	} : {
		attributes: e?.attributes || {},
		card: e?.card || {}
	};
}
function Rf(e = {}) {
	return e?.badge || e?.card || {};
}
function zf(e) {
	return Bf(e) !== "none";
}
function Bf(e) {
	return typeof e == "string" ? e : e?.action || "none";
}
var Vf, Hf, Uf, Wf, Gf = e((() => {
	M(), Io(), zd(), Y(), Qs(), yf(), $u(), Q(), Pt(), Vf = Symbol.for("orbit-deck-card-dev-preview-selected-index"), Hf = class extends j {
		static properties = {
			hass: { attribute: !1 },
			lovelace: { attribute: !1 },
			_config: { state: !0 },
			_selectedTab: { state: !0 },
			_selectedDeckIndex: { state: !0 },
			_childPickerType: { state: !0 },
			_colorPickerKey: { state: !0 },
			_colorPickerTab: { state: !0 },
			_styleSectionExpanded: { state: !0 },
			_cardSectionExpanded: { state: !0 }
		};
		constructor() {
			super(), this._config = {}, this._selectedTab = "setup", this._selectedDeckIndex = 0, this._childPickerType = "badge", this._colorPickerKey = "", this._colorPickerTab = "picker", this._styleSectionExpanded = !1, this._cardSectionExpanded = !0;
		}
		connectedCallback() {
			super.connectedCallback(), wo(this), this._updateDocumentationContext();
		}
		disconnectedCallback() {
			To(this), super.disconnectedCallback();
		}
		setConfig(e) {
			let t = Nf(e || {});
			this._config = {
				...t.config,
				layout: ["tabs", "overlay"].includes(e?.layout) ? e.layout : "wrap"
			}, this._selectedDeckIndex = Math.min(this._selectedDeckIndex || 0, Math.max(0, this._getDeckItems().length - 1));
			let n = this._getDeckItems()[this._selectedDeckIndex];
			this._childPickerType = n?.badge ? "badge" : "card", this._updateDocumentationContext(), t.changed && queueMicrotask(() => this._dispatchConfigChanged());
		}
		_t(e, t) {
			return X(this.hass, e, t);
		}
		_getColorPickerValue(e) {
			return Oo(e);
		}
		_getColorStyle(e) {
			return Do(e);
		}
		_updateConfig(e) {
			this._config = Mf(Qi(this._config, e)), this._dispatchConfigChanged();
		}
		_dispatchConfigChanged() {
			this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: this._getPreviewConfig() },
				bubbles: !0,
				composed: !0
			}));
		}
		_getPreviewConfig() {
			return {
				...this._config,
				[Vf]: this._selectedDeckIndex || 0
			};
		}
		_getDeckItems(e = this._config) {
			return Array.isArray(e?.decks) ? e.decks.map(Lf) : [];
		}
		_selectDeckItem(e) {
			let t = this._getDeckItems()[e];
			this._selectedDeckIndex = e, this._childPickerType = t?.badge ? "badge" : "card", this._dispatchPreviewSelection(e);
		}
		_dispatchPreviewSelection(e) {
			this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: {
					...this._getPreviewConfig(),
					[Vf]: e
				} },
				bubbles: !0,
				composed: !0
			}));
		}
		_addDeckItem() {
			let e = this._getDeckItems();
			this._selectedDeckIndex = e.length, this._selectedTab = "card", this._childPickerType = "badge", this.requestUpdate();
		}
		_removeDeckItem(e) {
			let t = this._getDeckItems().filter((t, n) => n !== e);
			this._selectedDeckIndex = Math.max(0, Math.min(e, t.length - 1)), this._updateConfig({ decks: t });
		}
		_duplicateDeckItem(e) {
			let t = this._getDeckItems(), n = t[e];
			if (!n) return;
			let r = [...t];
			r.splice(e + 1, 0, structuredClone(n)), this._selectedDeckIndex = e + 1, this._updateConfig({ decks: r });
		}
		_moveDeckItem(e, t) {
			let n = this._getDeckItems(), r = e + t;
			if (r < 0 || r >= n.length) return;
			let i = [...n], [a] = i.splice(e, 1);
			i.splice(r, 0, a), this._selectedDeckIndex = r, this._updateConfig({ decks: i });
		}
		_updateDeckItem(e, t) {
			let n = [...this._getDeckItems()];
			n[e] = {
				...n[e] || {},
				...t
			}, this._updateConfig({ decks: n });
		}
		_updateDeckAttributes(e, t) {
			let n = this._getDeckItems()[e] || {};
			this._updateDeckItem(e, { attributes: {
				...n.attributes || {},
				...t
			} });
		}
		_updateDeckCard(e, t) {
			let n = this._getDeckItems();
			if (e >= n.length) {
				this._selectedDeckIndex = n.length, this._updateConfig({ decks: [...n, {
					attributes: {},
					card: t
				}] });
				return;
			}
			this._updateDeckItem(e, {
				badge: void 0,
				card: t
			});
		}
		_updateDeckBadge(e, t) {
			let n = this._getDeckItems();
			if (e >= n.length) {
				this._selectedDeckIndex = n.length, this._updateConfig({ decks: [...n, {
					attributes: {},
					badge: t
				}] });
				return;
			}
			this._updateDeckItem(e, {
				badge: t,
				card: void 0
			});
		}
		_renderInput(e, t, n = "", r = {}) {
			return Ji.call(this, e, t, n, r);
		}
		_renderNumberInput(e, t, n = {}) {
			return Xi.call(this, e, t, n);
		}
		_renderColorControl(e, t, n, r, i = n) {
			return ia.call(this, e, t, n, r, i);
		}
		_renderSubTabs() {
			return D`
      <div class="deck-subtabs-row">
        <div class="editor-tabs deck-subtabs">
          ${["setup", "card"].map((e) => D`
            <button
              type="button"
              class="editor-tab ${this._selectedTab === e ? "active" : ""}"
              @click=${() => {
				this._selectedTab = e, this._updateDocumentationContext();
			}}
            >
              ${e === "setup" ? this._t("Setup") : this._t("Card")}
            </button>
          `)}
        </div>

        <ha-selector
          class="editor-header-button-toggle deck-layout-toggle"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [
				{
					label: this._t("Wrap"),
					value: "wrap"
				},
				{
					label: this._t("Tabs"),
					value: "tabs"
				},
				{
					label: this._t("Overlay"),
					value: "overlay"
				}
			] } }}
          .value=${this._config?.layout || "wrap"}
          @value-changed=${(e) => {
				this._updateConfig({ layout: e.detail.value || "wrap" }), this._updateDocumentationContext();
			}}
        ></ha-selector>
      </div>
    `;
		}
		_updateDocumentationContext() {
			let e = this._selectedTab === "card" ? "card" : `setup-${this._config?.layout || "wrap"}`;
			At(this, "orbit-deck-card-dev", e);
		}
		_renderSetup() {
			let e = this._getDeckItems();
			return D`
      <div class="section deck-card-tab-section">
        ${this._config?.layout === "wrap" ? Rd.call(this, {
				itemCount: e.length,
				classPrefix: "action",
				wrapEnabled: !0,
				showWrapToggle: !1,
				perRowKey: "items_per_row",
				perRowLabel: "Items per row",
				defaultPerRow: 1
			}) : this._config?.layout === "tabs" ? D`
              ${this._renderTabWidthModeControl()}
              ${this._renderInput("Tab font size", "tab_font_size", "18px", {
				value: this._config?.tab_font_size || "",
				onValueChanged: (e) => this._updateConfig({ tab_font_size: e || void 0 })
			})}
              <label class="deck-tab-divider-row">
                <span>${this._t("Divider")}</span>
                <ha-switch
                  .checked=${this._config?.tab_divider !== !1}
                  @change=${(e) => this._updateConfig({ tab_divider: e.target.checked ? void 0 : !1 })}
                ></ha-switch>
              </label>
              <div class="field-grid two-columns deck-tab-colors">
                ${this._renderColorControl(["Inactive", "Color"], "tab_color", this._config?.tab_color || "", (e) => this._updateConfig({ tab_color: e || void 0 }), "primary-text-color")}
                ${this._renderColorControl(["Active", "Color"], "tab_active_color", this._config?.tab_active_color || "", (e) => this._updateConfig({ tab_active_color: e || void 0 }), "primary-color")}
                ${this._renderColorControl(["Background", "Color"], "tab_background_color", this._config?.tab_background_color || "", (e) => this._updateConfig({ tab_background_color: e || void 0 }), "card-background-color")}
              </div>
              ` : ""}
      </div>
    `;
		}
		_renderTabWidthModeControl() {
			return D`
      <div class="field editor-button-toggle-field">
        <div class="field-header">
          <label>${this._t("Tab width")}</label>

          <ha-selector
            class="editor-header-button-toggle deck-tab-width-toggle"
            .hass=${this.hass}
            .selector=${{ button_toggle: { options: [
				{
					label: this._t("Equal"),
					value: "equal"
				},
				{
					label: this._t("Dynamic"),
					value: "dynamic"
				},
				{
					label: this._t("Custom"),
					value: "custom"
				}
			] } }}
            .value=${this._config?.tab_width_mode || "equal"}
            @value-changed=${(e) => this._updateConfig({ tab_width_mode: e.detail.value || "equal" })}
          ></ha-selector>
        </div>
      </div>
    `;
		}
		_renderDeckTabs(e, t) {
			let { itemsPerRow: n, shouldWrapTabs: r } = Ld({
				config: this._config,
				itemCount: e.length,
				wrapEnabled: this._config?.layout === "wrap",
				defaultPerRow: 1
			});
			return D`
      <div
        class="action-tabs ${r ? "wrapped" : ""} ${e.length > 1 ? "has-tools" : ""}"
        style=${r ? `--action-tabs-per-row: ${n};` : ""}
      >
        <div class="action-tab-items">
          ${e.map((e, n) => D`
            <button
              type="button"
              class="action-tab ${n === t ? "active" : ""}"
              @click=${() => this._selectDeckItem(n)}
            >
              ${this._config?.layout === "overlay" && n === 0 ? this._t("Main") : n + 1}
            </button>
          `)}
        </div>

        <div class="action-editor-tools">
          <button
            type="button"
            class="action-tab-add"
            title=${this._t("Add")}
            @click=${() => this._addDeckItem()}
          >
            +
          </button>

          ${e.length > 0 && t < e.length ? D`
                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Duplicate")}
                  @click=${() => this._duplicateDeckItem(t)}
                >
                  <ha-icon icon="mdi:content-copy"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button action-tool-remove"
                  title=${this._t("Remove")}
                  @click=${() => this._removeDeckItem(t)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move left")}
                  ?disabled=${t === 0}
                  @click=${() => this._moveDeckItem(t, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move right")}
                  ?disabled=${t === e.length - 1}
                  @click=${() => this._moveDeckItem(t, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>
              ` : ""}
        </div>
      </div>
    `;
		}
		_renderChildTypeTabs(e) {
			let t = this._childPickerType;
			return D`
      <div class="editor-tabs deck-child-type-tabs" role="tablist">
        ${[["badge", "Badges"], ["card", "Cards"]].map(([e, n]) => D`
          <button
            type="button"
            class="editor-tab ${t === e ? "active" : ""}"
            role="tab"
            aria-selected=${t === e ? "true" : "false"}
            @click=${() => {
				this._childPickerType = e;
			}}
          >
            ${this._t(n)}
          </button>
        `)}
      </div>
    `;
		}
		_renderChildPicker(e, t) {
			return this._childPickerType === "badge" ? this._renderBadgePicker(e, t) : this._renderCardPicker(e, t);
		}
		_renderBadgePicker(e, t) {
			return t?.badge?.type ? customElements.get("hui-badge-element-editor") ? D`
        <hui-badge-element-editor
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          .value=${t.badge}
          @config-changed=${(t) => {
				t.stopPropagation(), this._updateDeckBadge(e, t.detail.config);
			}}
        ></hui-badge-element-editor>
      ` : (this._ensureNativeBadgeEditor(), D`
          <div class="deck-card-picker-loading">
            <ha-spinner></ha-spinner>
          </div>
        `) : !this.hass || !this.lovelace ? D`` : customElements.get("hui-badge-picker") ? D`
      <hui-badge-picker
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .badgePicked=${(t) => this._updateDeckBadge(e, t)}
        @config-changed=${(t) => {
				t.stopPropagation(), this._updateDeckBadge(e, t.detail.config);
			}}
      ></hui-badge-picker>
    ` : (this._ensureNativeBadgePicker(), D`
        <div class="deck-card-picker-loading">
          <ha-spinner></ha-spinner>
        </div>
      `);
		}
		_renderCardPicker(e, t) {
			return t?.card?.type ? D`
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          .value=${t.card}
          @config-changed=${(t) => {
				t.stopPropagation(), this._updateDeckCard(e, t.detail.config);
			}}
        ></hui-card-element-editor>
      ` : !this.hass || !this.lovelace ? D`` : customElements.get("hui-card-picker") ? D`
      <hui-card-picker
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .cardPicked=${(t) => this._updateDeckCard(e, t)}
        @config-changed=${(t) => {
				t.stopPropagation(), this._updateDeckCard(e, t.detail.config);
			}}
      ></hui-card-picker>
    ` : (this._ensureNativeCardPicker(), D`
        <hui-card-element-editor
          class="native-picker-preloader"
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          .value=${{
				type: "vertical-stack",
				cards: []
			}}
          @config-changed=${(e) => e.stopPropagation()}
        ></hui-card-element-editor>
        <div class="deck-card-picker-loading">
          <ha-spinner></ha-spinner>
        </div>
      `);
		}
		_renderDeckStyleControls(e, t) {
			let n = t?.attributes || {}, r = this._config?.layout === "tabs", i = this._config?.layout === "overlay" && e > 0;
			return D`
      <ha-expansion-panel
        class="deck-card-section deck-style-section"
        outlined
        .expanded=${this._styleSectionExpanded === !0}
        @expanded-changed=${(e) => {
				this._styleSectionExpanded = e.detail.expanded;
			}}
      >
        <ha-icon slot="leading-icon" icon="mdi:palette"></ha-icon>
        <div slot="header" role="heading" aria-level="3">
          ${this._t("Style")}
        </div>
        <div class="deck-card-section-content deck-style-content">
          ${r ? D`
                <div class="field-grid two-columns">
                  ${this._renderAttributeSelector(e, {
				label: "Icon",
				selector: { icon: {} },
				value: n.icon || "",
				changeKey: "icon"
			})}
                  ${this._renderAttributeSelector(e, {
				label: "Name",
				selector: { text: {} },
				value: n.name || n.label || "",
				changeKey: "name"
			})}
                </div>
              ` : ""}

          ${r && this._config?.tab_width_mode === "custom" ? this._renderAttributeSelector(e, {
				label: "Tab width",
				selector: { text: {} },
				value: n.width || "",
				changeKey: "width"
			}) : ""}

          ${i ? D`
                <div class="field editor-button-toggle-field">
                  <div class="field-header">
                    <label>${this._t("Mode")}</label>
                    <ha-selector
                      class="editor-header-button-toggle deck-overlay-fit-toggle"
                      .hass=${this.hass}
                      .selector=${{ button_toggle: { options: [{
				label: this._t("Crop"),
				value: "crop"
			}, {
				label: this._t("Resize"),
				value: "resize"
			}] } }}
                      .value=${n.fit || "resize"}
                      @value-changed=${(t) => this._updateDeckAttributes(e, { fit: t.detail.value === "resize" ? void 0 : t.detail.value })}
                    ></ha-selector>
                  </div>
                </div>
                <div class="field-grid four-columns deck-overlay-layout-grid">
                  ${this._renderOverlayNumberSelector(e, {
				label: "Left",
				value: n.left,
				changeKey: "left",
				min: -1e4
			})}
                  ${this._renderOverlayNumberSelector(e, {
				label: "Top",
				value: n.top,
				changeKey: "top",
				min: -1e4
			})}
                  ${this._renderOverlayNumberSelector(e, {
				label: "Width",
				value: n.width,
				changeKey: "width"
			})}
                  ${this._renderOverlayNumberSelector(e, {
				label: "Height",
				value: n.height,
				changeKey: "height"
			})}
                </div>
                <label class="deck-force-padding-row">
                  <span>${this._t("Transparent background")}</span>
                  <ha-switch
                    .checked=${n.transparent_background === !0}
                    @change=${(t) => this._updateDeckAttributes(e, { transparent_background: t.target.checked ? !0 : void 0 })}
                  ></ha-switch>
                </label>
              ` : ""}

          <label class="deck-force-padding-row">
            <span>${this._t("Force padding")}</span>
            <ha-switch
              .checked=${n.force_padding === !0}
              @change=${(t) => this._updateDeckAttributes(e, { force_padding: t.target.checked ? !0 : void 0 })}
            ></ha-switch>
          </label>

          <div class="field-grid four-columns deck-padding-grid">
            ${this._renderAttributeSelector(e, {
				label: "Top",
				selector: { text: {} },
				value: n.padding_top || "",
				changeKey: "padding_top"
			})}
            ${this._renderAttributeSelector(e, {
				label: "Bottom",
				selector: { text: {} },
				value: n.padding_bottom || "",
				changeKey: "padding_bottom"
			})}
            ${this._renderAttributeSelector(e, {
				label: "Left",
				selector: { text: {} },
				value: n.padding_left || "",
				changeKey: "padding_left"
			})}
            ${this._renderAttributeSelector(e, {
				label: "Right",
				selector: { text: {} },
				value: n.padding_right || "",
				changeKey: "padding_right"
			})}
          </div>
        </div>
      </ha-expansion-panel>
    `;
		}
		_renderAttributeSelector(e, { label: t, selector: n, value: r, changeKey: i }) {
			return D`
      <ha-selector
        .hass=${this.hass}
        .label=${this._t(t)}
        .selector=${n}
        .value=${r}
        @value-changed=${(t) => this._updateDeckAttributes(e, { [i]: t.detail.value || void 0 })}
      ></ha-selector>
    `;
		}
		_renderOverlayNumberSelector(e, { label: t, value: n, changeKey: r, min: i = 0 }) {
			return Xi.call(this, t, r, {
				value: n ?? "",
				min: i,
				onValueChanged: (t) => this._updateDeckAttributes(e, { [r]: t === "" || t === null ? void 0 : t })
			});
		}
		_renderDeckCardSection(e, t) {
			return D`
      <ha-expansion-panel
        class="deck-card-section"
        outlined
        .expanded=${this._cardSectionExpanded !== !1}
        @expanded-changed=${(e) => {
				this._cardSectionExpanded = e.detail.expanded;
			}}
      >
        <ha-icon slot="leading-icon" icon="mdi:cards-outline"></ha-icon>
        <div slot="header" role="heading" aria-level="3">
          ${this._t("Card")}
        </div>
        <div class="deck-card-section-content">
          ${this._renderChildTypeTabs(t)}
          <div class="deck-card-editor-frame">
            ${this._renderChildPicker(e, t)}
          </div>
        </div>
      </ha-expansion-panel>
    `;
		}
		_renderDeckInteractions(e, t) {
			let n = t?.attributes || {}, r = If(t, "tap_action"), i = If(t, "hold_action"), a = If(t, "double_tap_action");
			return J.call(this, {
				expanded: !1,
				config: n,
				onChange: (t) => this._updateDeckAttributes(e, t),
				interactions: [
					{
						key: "tap_action",
						formKey: "tap_action",
						label: "Tap behavior",
						defaultAction: r,
						defaultVisible: zf(r),
						displayDefaultValue: zf(r)
					},
					{
						key: "hold_action",
						formKey: "hold_action",
						label: "Hold behavior",
						defaultAction: i,
						defaultVisible: zf(i),
						displayDefaultValue: zf(i)
					},
					{
						key: "double_tap_action",
						formKey: "double_tap_action",
						label: "Double tap behavior",
						defaultAction: a,
						defaultVisible: zf(a),
						displayDefaultValue: zf(a)
					}
				],
				context: { entity_id: n.entity || Rf(t)?.entity }
			});
		}
		async _ensureNativeBadgePicker() {
			if (!this._badgePickerLoadRequested) {
				this._badgePickerLoadRequested = !0;
				try {
					window.loadCardHelpers && await window.loadCardHelpers(), customElements.get("hui-badge-picker") || await this._loadNativeBadgeModule({
						eventName: "ll-create-badge",
						dialogTag: "hui-dialog-create-badge"
					}), await Promise.race([customElements.whenDefined("hui-badge-picker"), new Promise((e) => setTimeout(e, 1500))]);
				} catch {} finally {
					this._badgePickerLoadRequested = !1, this.requestUpdate();
				}
			}
		}
		async _ensureNativeBadgeEditor() {
			if (!this._badgeEditorLoadRequested) {
				this._badgeEditorLoadRequested = !0;
				try {
					if (window.loadCardHelpers && await window.loadCardHelpers(), !customElements.get("hui-badge-element-editor")) {
						let e = this._findElementInShadowRoots(document, (e) => e.localName === "hui-view" && e._layoutElement), t = Number.isInteger(e?.index) ? e.index : 0;
						await this._loadNativeBadgeModule({
							eventName: "ll-edit-badge",
							dialogTag: "hui-dialog-edit-badge",
							detail: { path: [t, 0] },
							huiView: e
						});
					}
					await Promise.race([customElements.whenDefined("hui-badge-element-editor"), new Promise((e) => setTimeout(e, 1500))]);
				} catch {} finally {
					this._badgeEditorLoadRequested = !1, this.requestUpdate();
				}
			}
		}
		async _loadNativeBadgeModule({ eventName: e, dialogTag: t, detail: n, huiView: r }) {
			let i = r || this._findElementInShadowRoots(document, (e) => e.localName === "hui-view" && e._layoutElement);
			if (!i) return;
			let a, o = (e) => {
				e.detail?.dialogTag === t && (e.preventDefault(), e.stopImmediatePropagation(), a = e.detail.dialogImport);
			};
			i.addEventListener("show-dialog", o);
			try {
				i._layoutElement.dispatchEvent(new CustomEvent(e, {
					detail: n,
					bubbles: !1,
					composed: !0
				}));
			} finally {
				i.removeEventListener("show-dialog", o);
			}
			typeof a == "function" && await a();
		}
		_findElementInShadowRoots(e, t) {
			let n = e.querySelectorAll?.("*") || [];
			for (let e of n) {
				if (t(e)) return e;
				if (e.shadowRoot) {
					let n = this._findElementInShadowRoots(e.shadowRoot, t);
					if (n) return n;
				}
			}
		}
		async _ensureNativeCardPicker() {
			if (!this._cardPickerLoadRequested) {
				this._cardPickerLoadRequested = !0;
				try {
					window.loadCardHelpers && await window.loadCardHelpers(), await Promise.race([customElements.whenDefined("hui-card-picker"), new Promise((e) => setTimeout(e, 1500))]);
				} catch {} finally {
					this._cardPickerLoadRequested = !1, this.requestUpdate();
				}
			}
		}
		_renderCard() {
			let e = this._getDeckItems(), t = Math.min(this._selectedDeckIndex || 0, e.length), n = e[t], r = t === e.length;
			return D`
      <div class="section">
        ${this._renderDeckTabs(e, t)}

        ${n || r ? D`
              ${n && this._config?.layout === "tabs" ? D`
                    <label class="deck-default-toggle">
                      <span>${this._t("Default")}</span>
                      <ha-switch
                        .checked=${!!n.attributes?.default}
                        @change=${(e) => this._setDefaultDeck(t, e.target.checked)}
                      ></ha-switch>
                    </label>
                  ` : ""}

              ${n ? this._renderDeckStyleControls(t, n) : ""}

              ${n ? D`
                    <div class="deck-interactions-section">
                      ${this._renderDeckInteractions(t, n)}
                    </div>
                  ` : ""}

              ${this._renderDeckCardSection(t, n)}
            ` : D`<div class="deck-empty-editor">${this._t("Add a card to start.")}</div>`}
      </div>
    `;
		}
		_setDefaultDeck(e, t) {
			let n = this._getDeckItems().map((n, r) => ({
				...n,
				attributes: {
					...n.attributes || {},
					default: t && r === e ? !0 : void 0
				}
			}));
			this._updateConfig({ decks: n });
		}
		render() {
			return D`
      <div class="wrapper">
        ${this._renderSubTabs()}
        ${this._selectedTab === "setup" ? this._renderSetup() : this._renderCard()}

        <div class="editor-version">
          ${this._t("Orbit Deck Card (Dev) v{version}", { version: Z.deck })}
        </div>
      </div>
    `;
		}
		static styles = [
			Zs,
			vf,
			c`
      .deck-subtabs-row {
        display: flex;
        align-items: end;
        gap: 12px;
        border-bottom: 1px solid var(--orbit-editor-border);
        margin-bottom: 12px;
      }

      .deck-subtabs {
        flex: 1 1 auto;
        border-bottom: none;
      }

      .deck-layout-toggle {
        display: flex;
        justify-content: flex-end;
        margin-left: auto;
        width: auto;
        min-width: 270px;
        margin-bottom: 6px;
      }

      .deck-tab-width-toggle {
        width: auto;
        min-width: 260px;
      }

      .deck-overlay-fit-toggle {
        width: min(360px, 100%);
        min-width: 0;
      }

      .field-grid.two-columns {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 12px;
      }

      .field-grid.four-columns {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 8px;
      }

      .deck-tab-colors {
        margin-top: 12px;
      }

      .deck-tab-divider-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        min-height: 36px;
        margin-top: 4px;
        font-size: var(--ha-font-size-m, 14px);
        font-weight: var(--ha-font-weight-normal, 400);
        line-height: var(--ha-line-height-normal, 20px);
      }

      .deck-card-tab-section {
        gap: 4px;
      }

      .deck-style-section {
        margin-top: 4px;
      }

      .deck-style-content {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding-bottom: 0;
      }

      .deck-style-content .field-grid.two-columns {
        margin-bottom: 0;
      }

      .deck-force-padding-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        min-height: 36px;
        margin: 0;
        font-size: var(--ha-font-size-m, 14px);
        font-weight: var(--ha-font-weight-normal, 400);
        line-height: var(--ha-line-height-normal, 20px);
      }

      .deck-padding-grid {
        margin-top: -4px;
        margin-bottom: -26px;
      }

      .deck-interactions-section .interactions-form {
        margin-top: 0;
      }

      .deck-default-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin: 6px 0 16px;
      }

      .deck-card-editor-frame {
        min-height: 160px;
      }

      .deck-child-type-tabs {
        margin: -4px 0 12px;
      }

      hui-badge-picker {
        display: block;
        min-height: 320px;
      }

      .deck-card-section {
        display: block;
        margin: 0;
        --expansion-panel-content-padding: 0;
        border-radius: var(--ha-border-radius-md);
        --ha-card-border-radius: var(--ha-border-radius-md);
      }

      .deck-card-section-content {
        padding: 12px;
      }

      .deck-card-section ha-icon {
        color: var(--secondary-text-color);
      }

      .deck-card-picker-loading {
        width: 100%;
        min-height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .native-picker-preloader {
        display: none;
      }

      .deck-empty-editor {
        color: var(--secondary-text-color);
        padding: 24px 0;
      }
    `
		];
	}, customElements.define("orbit-deck-card-dev-editor", Hf), Uf = [
		"type",
		"layout",
		"items_per_row",
		"separate_cards",
		"tab_font_size",
		"tab_divider",
		"tab_width_mode",
		"tab_color",
		"tab_active_color",
		"tab_background_color",
		"decks",
		"grid_options",
		"view_layout"
	], Wf = [
		"attributes",
		"badge",
		"card"
	];
})), Kf = /* @__PURE__ */ t((() => {
	M(), It(), Q(), L(), kf(), at(), jn(), jf(), Gf();
	var e = class extends j {
		static get properties() {
			return {
				hass: {},
				_config: { type: Object },
				_deckCards: { state: !0 },
				_selectedIndex: { state: !0 }
			};
		}
		constructor() {
			super(), this._config = {}, this._deckCards = [], this._selectedIndex = 0, this._cardHelpers = null, this._cardBuildKey = "", this._defaultSelectionKey = "", this._paddingApplyKey = "", this._overlayGeometryFrame = null, this._overlayGeometryObserver = null, this._overlayObservedTargets = /* @__PURE__ */ new Set(), this._overlayGeometryToken = 0;
		}
		disconnectedCallback() {
			super.disconnectedCallback(), this._clearOverlayGeometryObserver();
		}
		static getConfigElement() {
			return document.createElement("orbit-deck-card-dev-editor");
		}
		static getStubConfig() {
			return {
				type: "custom:orbit-deck-card-dev",
				layout: "wrap",
				decks: []
			};
		}
		getLayoutOptions() {
			let e = t(this._config), n = Math.max(e.length, 1), r = this._getColumnCount(n);
			return {
				grid_columns: Math.max(1, r * 2),
				grid_min_columns: 1,
				grid_rows: "auto"
			};
		}
		setConfig(e) {
			let n = ["tabs", "overlay"].includes(e?.layout) ? e.layout : "wrap";
			this._config = {
				...e,
				layout: n
			};
			let r = t(this._config), i = g(r), a = h(r);
			Number.isInteger(e?.[Vf]) ? this._selectedIndex = Math.min(Math.max(0, e[Vf]), Math.max(0, r.length - 1)) : i === this._defaultSelectionKey ? this._selectedIndex = Math.min(this._selectedIndex || 0, Math.max(0, r.length - 1)) : (this._selectedIndex = a, this._defaultSelectionKey = i), this._scheduleCardBuild();
		}
		updated(e) {
			e.has("hass") && this._deckCards.forEach((e) => {
				e.element && (e.element.hass = this.hass);
			}), (e.has("_deckCards") || e.has("_config")) && (this._applyDeckPaddingToEntries(), this._bindDeckItemActionListeners()), this._config?.layout === "overlay" ? (e.has("_deckCards") || e.has("_config")) && this._scheduleOverlayGeometrySync() : this._clearOverlayGeometryObserver();
		}
		_scheduleOverlayGeometrySync() {
			this._overlayGeometryFrame !== null && cancelAnimationFrame(this._overlayGeometryFrame);
			let e = ++this._overlayGeometryToken;
			this._overlayGeometryFrame = requestAnimationFrame(() => {
				this._overlayGeometryFrame = null, this._syncOverlayGeometry(e);
			});
		}
		async _syncOverlayGeometry(e) {
			if (this._config?.layout !== "overlay") return;
			let t = this.renderRoot.querySelector(".deck-overlay"), n = [...this.renderRoot.querySelectorAll(".deck-overlay-item")];
			if (!t || !n.length || (await Promise.all(this._deckCards.slice(1).map((e) => e?.element?.updateComplete instanceof Promise ? e.element.updateComplete.catch(() => {}) : Promise.resolve())), e !== this._overlayGeometryToken)) return;
			let r = t.clientWidth;
			n.forEach((e) => {
				let t = e.querySelector(".deck-overlay-content");
				if (!t) return;
				let n = e.classList.contains("overlay-badge");
				t.style.width = n ? "max-content" : `${r}px`, t.style.height = "auto";
			}), n.forEach((e) => this._applyOverlayItemGeometry(e)), this._observeOverlayGeometry(t, n);
		}
		_applyOverlayItemGeometry(e) {
			let t = Number(e.dataset.deckIndex), n = Number.isInteger(t) ? this._deckCards[t] : null, r = e.querySelector(".deck-overlay-content");
			if (!n || !r) return;
			let s = r.offsetWidth, c = r.offsetHeight;
			if (s <= 0 || c <= 0) return;
			let l = n.item?.attributes || {}, u = d(n.item) === "badge", f = i(l.width), p = i(l.height), m = a(n.item) === "crop", h = o(s, c, f, p, m);
			e.style.width = `${h.width}px`, e.style.height = `${h.height}px`, e.style.overflow = m ? "hidden" : "visible", r.style.width = u ? "max-content" : `${s}px`, r.style.height = "auto", r.style.transform = m ? "none" : `scale(${h.scaleX}, ${h.scaleY})`, e.dataset.naturalWidth = String(s), e.dataset.naturalHeight = String(c);
		}
		_observeOverlayGeometry(e, t) {
			if (!window.ResizeObserver) return;
			this._overlayGeometryObserver ||= new ResizeObserver(() => {
				this._scheduleOverlayGeometrySync();
			});
			let n = new Set([e]);
			t.forEach((e) => {
				let t = e.querySelector(".deck-overlay-content");
				t && n.add(t);
			}), this._overlayObservedTargets.forEach((e) => {
				n.has(e) || this._overlayGeometryObserver.unobserve(e);
			}), n.forEach((e) => {
				this._overlayObservedTargets.has(e) || this._overlayGeometryObserver.observe(e);
			}), this._overlayObservedTargets = n;
		}
		_clearOverlayGeometryObserver() {
			this._overlayGeometryToken += 1, this._overlayGeometryFrame !== null && (cancelAnimationFrame(this._overlayGeometryFrame), this._overlayGeometryFrame = null), this._overlayGeometryObserver?.disconnect(), this._overlayObservedTargets.clear();
		}
		_getColumnCount(e) {
			return ["tabs", "overlay"].includes(this._config?.layout) ? 1 : Math.max(1, Math.min(e, Number(this._config?.items_per_row) || 1));
		}
		async _scheduleCardBuild() {
			let e = t(this._config), n = JSON.stringify(e.map((e, t) => ({
				kind: d(e),
				config: u(e, y(this._config, e, t))
			})));
			if (n === this._cardBuildKey) {
				this._deckCards = this._deckCards.map((t, n) => ({
					...t,
					item: e[n],
					index: n
				}));
				return;
			}
			this._cardBuildKey = n, this._deckCards = e.map((e, t) => ({
				item: e,
				index: t
			}));
			let r = await this._loadCardHelpers(), i = e.map((e, t) => this._createDeckEntry(e, r, t, y(this._config, e, t)));
			n === this._cardBuildKey && (this._deckCards = i);
		}
		async _loadCardHelpers() {
			return !this._cardHelpers && window.loadCardHelpers && (this._cardHelpers = await window.loadCardHelpers()), this._cardHelpers;
		}
		_createDeckEntry(e, t, n, r = !1) {
			let i = d(e), a = u(e, r);
			if (!a.type) return {
				item: e,
				index: n,
				error: `No ${i} type configured`
			};
			try {
				let r = i === "badge" ? t.createBadgeElement(a) : t.createCardElement(a);
				return r.hass = this.hass, r.addEventListener("ll-rebuild", () => this._scheduleCardBuild(), { once: !0 }), {
					item: e,
					index: n,
					kind: i,
					element: r
				};
			} catch (t) {
				return {
					item: e,
					index: n,
					error: t?.message || "Unable to create card"
				};
			}
		}
		_selectTab(e) {
			this._selectedIndex = e;
		}
		get _LONG_PRESS_DELAY() {
			return 500;
		}
		_handleAction(e, t = null) {
			return Ue.call(this, e, t);
		}
		_navigate(e) {
			return qe.call(this, e);
		}
		_clearDoubleTapTimer() {
			return We.call(this);
		}
		_startLongPress(e, t, n) {
			return On.call(this, e, t, n);
		}
		_cancelLongPress() {
			return kn.call(this);
		}
		_finishLongPress(e) {
			return An.call(this, e);
		}
		_getDeckEntryFromEventTarget(e) {
			let t = Number(e?.dataset?.deckIndex);
			return Number.isInteger(t) && this._deckCards[t] || null;
		}
		_bindDeckItemActionListeners() {
			this.renderRoot.querySelectorAll(".deck-item-interaction").forEach((e) => {
				if (e._orbitDeckActionHost === this) return;
				let t = {
					pointerdown: (t) => this._handleDeckItemPointerDown(t, this._getDeckEntryFromEventTarget(e)),
					click: (t) => this._handleDeckItemClick(t, this._getDeckEntryFromEventTarget(e)),
					dblclick: (t) => this._handleDeckItemDoubleClick(t, this._getDeckEntryFromEventTarget(e)),
					pointerup: (e) => this._finishLongPress(e),
					pointerleave: () => this._cancelLongPress(),
					pointercancel: () => this._cancelLongPress()
				};
				e.addEventListener("pointerdown", t.pointerdown, { capture: !0 }), e.addEventListener("click", t.click, { capture: !0 }), e.addEventListener("dblclick", t.dblclick, { capture: !0 }), e.addEventListener("pointerup", t.pointerup, { capture: !0 }), e.addEventListener("pointerleave", t.pointerleave), e.addEventListener("pointercancel", t.pointercancel), e._orbitDeckActionHost = this;
			});
		}
		_handleDeckItemPointerDown(e, t) {
			if (!s(t?.item)) return;
			e.stopPropagation();
			let n = c(t?.item, "hold_action");
			if (N(n)) return this._startLongPress(e, l(t.item), n);
		}
		_handleDeckItemClick(e, t) {
			if (this._longPressTriggered) {
				this._longPressTriggered = !1;
				return;
			}
			let n = c(t?.item, "tap_action"), r = c(t?.item, "double_tap_action");
			!N(n) && !N(r) || F.call(this, e, l(t.item), n || { action: "none" }, r);
		}
		_handleDeckItemDoubleClick(e, t) {
			let n = c(t?.item, "double_tap_action");
			N(n) && I.call(this, e, l(t.item), n);
		}
		_renderInteractiveDeckEntry(e) {
			return D`
      <div
        class="deck-item-interaction ${s(e?.item) ? "has-actions" : ""}"
        data-deck-index=${e?.index ?? ""}
      >
        ${this._renderDeckEntry(e)}
      </div>
    `;
		}
		_renderDeckEntry(e) {
			return e?.element ? e.element : D`
      <ha-card class="deck-error-card">
        <div class="deck-error-title">Configuration error</div>
        <div>${e?.error || "No card configured"}</div>
      </ha-card>
    `;
		}
		_applyDeckPaddingToEntries() {
			let e = this._deckCards.map((e) => y(this._config, e.item, e.index) ? "flat" : "native").join(":"), t = `${re(this._deckCards)}|surface:${e}`;
			t !== this._paddingApplyKey && (this._paddingApplyKey = t, this._deckCards.forEach((e) => this._applyDeckCardPadding(e)));
		}
		_applyDeckCardPadding(e, t = 0) {
			let n = e?.element;
			if (!n) return;
			let r = Sf(e.item), i = Tf(e.item);
			(n.updateComplete instanceof Promise ? n.updateComplete : Promise.resolve()).then(() => new Promise((e) => requestAnimationFrame(e))).then(() => {
				let a = ce(n), o = a[0] || null, s = ie(this.renderRoot, e.index), c = y(this._config, e.item, e.index);
				if (!(!o && !s)) {
					if ((i || c) && !o && t < 10 && window.setTimeout(() => this._applyDeckCardPadding(e, t + 1), 50), b(n, c), a.forEach((e) => b(e, c)), !i && !o?._orbitDeckPaddingApplied && !s?._orbitDeckPaddingApplied) {
						o && de(o);
						return;
					}
					s && S(s, r, !1), o && S(o, r, i), i && o ? (w(o, r), requestAnimationFrame(() => {
						s && S(s, r, !1), S(o, r, !0);
					})) : o && de(o);
				}
			}).catch(() => {});
		}
		_renderWrap(e) {
			let t = this._getColumnCount(e.length || 1), n = te(this._deckCards, t);
			return D`
      <ha-card
        class="deck-card wrap ${e.length > 1 && this._config?.separate_cards ? "separate-cards" : ""}"
        style="--deck-columns:${t};"
      >
        <div class="deck-wrap">
          ${n.map((e) => D`
            <div class="deck-row">
              ${e.map((e) => D`
                <div class="deck-item">
                  ${this._renderInteractiveDeckEntry(e)}
                </div>
              `)}
              ${ne(e.length, t)}
            </div>
          `)}
        </div>
      </ha-card>
    `;
		}
		_renderTabs(e) {
			let t = Math.min(this._selectedIndex || 0, Math.max(0, e.length - 1)), n = this._deckCards[t], r = ee(this._config), i = _(this._config);
			return D`
      <ha-card
        class="deck-card tabs tab-width-${r} ${this._config?.tab_divider === !1 ? "hide-tab-dividers" : ""}"
        style=${i}
      >
        <div class="deck-tabs" role="tablist">
          ${e.map((e, n) => D`
            <button
              type="button"
              class="deck-tab ${n === t ? "active" : ""}"
              role="tab"
              aria-selected=${n === t ? "true" : "false"}
              style=${r === "custom" ? `--orbit-deck-tab-width:${e.attributes?.width || "120px"};` : ""}
              @click=${() => this._selectTab(n)}
            >
              ${e.attributes?.icon ? D`<ha-icon .icon=${e.attributes.icon}></ha-icon>` : ""}
              <span>${e.attributes?.name || e.attributes?.label || `Card ${n + 1}`}</span>
            </button>
          `)}
        </div>
        <div class="deck-tab-content">
          ${this._renderInteractiveDeckEntry(n)}
        </div>
      </ha-card>
    `;
		}
		_renderOverlay() {
			let e = this._deckCards[0], t = this._deckCards.slice(1);
			return D`
      <ha-card class="deck-card overlay">
        <div class="deck-overlay">
          <div class="deck-overlay-main deck-item">
            ${this._renderInteractiveDeckEntry(e)}
          </div>

          ${t.map((e, t) => D`
            <div
              class="deck-overlay-item deck-item ${a(e.item)} ${e.item?.attributes?.transparent_background === !0 ? "transparent-background" : ""} overlay-${e.kind || d(e.item)}"
              data-deck-index=${e.index}
              style=${n(e.item, t)}
            >
              <div class="deck-overlay-content">
                ${this._renderInteractiveDeckEntry(e)}
              </div>
            </div>
          `)}
        </div>
      </ha-card>
    `;
		}
		render() {
			let e = t(this._config);
			return e.length ? this._config?.layout === "tabs" ? this._renderTabs(e) : this._config?.layout === "overlay" ? this._renderOverlay() : this._renderWrap(e) : D`
        <ha-card class="deck-card empty">
          <div>Add card</div>
        </ha-card>
      `;
		}
		static styles = Af;
	};
	function t(e = {}) {
		return Array.isArray(e?.decks) ? e.decks.map((e) => e?.badge ? {
			attributes: e?.attributes || {},
			badge: e.badge || {}
		} : {
			attributes: e?.attributes || {},
			card: e?.card || {}
		}) : [];
	}
	function n(e = {}, t = 0) {
		let n = e?.attributes || {}, i = r(n.left, 0), a = r(n.top, 0);
		return `${[
			`--orbit-deck-overlay-left:${i}px`,
			`--orbit-deck-overlay-top:${a}px`,
			`--orbit-deck-overlay-z-index:${t + 1}`
		].join(";")};`;
	}
	function r(e, t) {
		if (e == null || e === "") return t;
		let n = Number(e);
		return Number.isFinite(n) ? n : t;
	}
	function i(e) {
		let t = r(e, null);
		return t === null ? null : Math.max(0, t);
	}
	function a(e = {}) {
		return e?.attributes?.fit === "crop" ? "crop" : "resize";
	}
	function o(e, t, n, r, i) {
		if (i) return {
			width: n ?? e,
			height: r ?? t,
			scaleX: 1,
			scaleY: 1
		};
		if (n === null && r === null) return {
			width: e,
			height: t,
			scaleX: 1,
			scaleY: 1
		};
		if (n !== null && r === null) {
			let r = n / e;
			return {
				width: n,
				height: t * r,
				scaleX: r,
				scaleY: r
			};
		}
		if (n === null && r !== null) {
			let n = r / t;
			return {
				width: e * n,
				height: r,
				scaleX: n,
				scaleY: n
			};
		}
		return {
			width: n,
			height: r,
			scaleX: n / e,
			scaleY: r / t
		};
	}
	function s(e = {}) {
		return [
			c(e, "tap_action"),
			c(e, "hold_action"),
			c(e, "double_tap_action")
		].some(N);
	}
	function c(e = {}, t) {
		let n = f(e), r = e?.attributes?.[t] || n?.[t];
		return r?.action ? r : null;
	}
	function l(e = {}) {
		let t = f(e);
		return e?.attributes?.entity || m(e?.attributes?.tap_action) || m(e?.attributes?.hold_action) || m(e?.attributes?.double_tap_action) || m(t?.tap_action) || m(t?.hold_action) || m(t?.double_tap_action) || t?.entity || null;
	}
	function u(e = {}, t = !1) {
		let n = f(e), r = Ef(e) ? p(n) : n, i = r;
		if (s(e)) {
			let { tap_action: e, hold_action: t, double_tap_action: n, ...a } = r;
			i = a;
		}
		return t ? {
			...i,
			hide_background: !0
		} : i;
	}
	function d(e = {}) {
		return e?.badge ? "badge" : "card";
	}
	function f(e = {}) {
		return e?.badge || e?.card || {};
	}
	function p(e) {
		return Array.isArray(e) ? e.map((e) => p(e)) : !e || typeof e != "object" ? e : Object.entries(e).reduce((e, [t, n]) => (t.toLowerCase().includes("padding") || (e[t] = p(n)), e), {});
	}
	function m(e) {
		return e?.entity || e?.entity_id || null;
	}
	function h(e = []) {
		return Math.max(0, e.findIndex((e) => e.attributes?.default));
	}
	function g(e = []) {
		return e.map((e, t) => e.attributes?.default ? t : "").join(":");
	}
	function ee(e = {}) {
		return [
			"equal",
			"dynamic",
			"custom"
		].includes(e?.tab_width_mode) ? e.tab_width_mode : "equal";
	}
	function _(e = {}) {
		return [
			e.tab_font_size ? `--orbit-deck-tab-font-size:${e.tab_font_size};` : "",
			v("--orbit-deck-tab-color", e.tab_color),
			v("--orbit-deck-tab-active-color", e.tab_active_color),
			v("--orbit-deck-tab-background-color", e.tab_background_color)
		].filter(Boolean).join("");
	}
	function v(e, t) {
		return t ? `${e}:${ot(t)};` : "";
	}
	function te(e, t = 1) {
		let n = Math.max(1, t), r = [];
		for (let t = 0; t < e.length; t += n) r.push(e.slice(t, t + n));
		return r;
	}
	function ne(e, t) {
		return Array.from({ length: Math.max(0, t - e) }, () => D`
    <div class="deck-spacer"></div>
  `);
	}
	function re(e = []) {
		return e.map((e) => {
			if (!e?.element) return `${e?.index ?? ""}:none`;
			let t = Sf(e.item), n = wf(e.item), r = Tf(e.item);
			return [
				e.index,
				e.kind || d(e.item),
				f(e.item)?.type || "",
				n ? "force" : "child",
				r ? t.top : "",
				r ? t.right : "",
				r ? t.bottom : "",
				r ? t.left : ""
			].join(":");
		}).join("|");
	}
	function ie(e, t) {
		return e?.querySelector?.(`.deck-item-interaction[data-deck-index="${t}"]`);
	}
	function y(e = {}, t = {}, n = 0) {
		return e?.layout === "wrap" ? !e?.separate_cards : e?.layout === "overlay" ? n > 0 && t?.attributes?.transparent_background === !0 : e?.layout === "tabs";
	}
	var ae = {
		"--ha-card-background": "transparent",
		"--card-background-color": "transparent",
		"--ha-card-box-shadow": "none",
		"--ha-card-border-color": "transparent",
		"--ha-card-backdrop-filter": "none",
		background: "transparent",
		"backdrop-filter": "none",
		"-webkit-backdrop-filter": "none",
		"border-color": "transparent",
		"box-shadow": "none"
	};
	function b(e, t) {
		if (t) {
			e._orbitDeckSurfaceStyles ||= Object.fromEntries(Object.keys(ae).map((t) => [t, {
				value: e.style.getPropertyValue(t),
				priority: e.style.getPropertyPriority(t)
			}])), oe(e), se(e);
			return;
		}
		let n = e._orbitDeckSurfaceStyles;
		n && (x(e), Object.entries(n).forEach(([t, n]) => {
			n.value ? e.style.setProperty(t, n.value, n.priority) : e.style.removeProperty(t);
		}), delete e._orbitDeckSurfaceStyles);
	}
	function oe(e) {
		Object.entries(ae).forEach(([t, n]) => {
			(e.style.getPropertyValue(t) !== n || e.style.getPropertyPriority(t) !== "important") && e.style.setProperty(t, n, "important");
		});
	}
	function se(e) {
		e._orbitDeckSurfaceObserver || (e._orbitDeckSurfaceObserver = new MutationObserver(() => {
			e._orbitDeckSurfaceStyles && oe(e);
		}), e._orbitDeckSurfaceObserver.observe(e, {
			attributes: !0,
			attributeFilter: ["style"]
		}));
	}
	function x(e) {
		e._orbitDeckSurfaceObserver?.disconnect(), e._orbitDeckSurfaceObserver = null;
	}
	function ce(e) {
		let t = [];
		return le(e, t, /* @__PURE__ */ new WeakSet()), t;
	}
	function le(e, t, n) {
		!e || n.has(e) || (n.add(e), e.localName === "ha-card" && !t.includes(e) && t.push(e), [e.shadowRoot, e].filter(Boolean).forEach((e) => {
			let r = e.querySelectorAll?.("*") || [];
			for (let e of r) e.localName === "ha-card" && !t.includes(e) && t.push(e), e.shadowRoot && le(e, t, n);
		}));
	}
	function S(e, t, n) {
		ue(e, n ? t : {
			top: "",
			right: "",
			bottom: "",
			left: ""
		}), e._orbitDeckPaddingApplied = n;
	}
	function ue(e, t) {
		C(e, "padding-top", t.top), C(e, "padding-right", t.right), C(e, "padding-bottom", t.bottom), C(e, "padding-left", t.left);
	}
	function C(e, t, n) {
		n ? (e.style.getPropertyValue(t) !== n || e.style.getPropertyPriority(t) !== "important") && e.style.setProperty(t, n, "important") : e.style.removeProperty(t);
	}
	function w(e, t) {
		e._orbitDeckPadding = t, !e._orbitDeckPaddingObserver && (e._orbitDeckPaddingObserver = new MutationObserver(() => {
			e._orbitDeckPadding && ue(e, e._orbitDeckPadding);
		}), e._orbitDeckPaddingObserver.observe(e, {
			attributes: !0,
			attributeFilter: ["style"]
		}));
	}
	function de(e) {
		e._orbitDeckPadding = null, e._orbitDeckPaddingObserver?.disconnect(), e._orbitDeckPaddingObserver = null;
	}
	Ft({
		tag: "orbit-deck-card-dev",
		cardClass: e,
		name: "Orbit Deck Card (Dev)",
		description: "Wrap or tab any Lovelace cards",
		version: Z.deck
	});
}));
//#endregion
//#region src/common/helpers/badge-registration.js
function qf({ tag: e, badgeClass: t, name: n, description: r, version: i, documentationURL: a }) {
	customElements.get(e) || customElements.define(e, t), window.customBadges = window.customBadges || [];
	for (let t = window.customBadges.length - 1; t >= 0; --t) window.customBadges[t].type === e && window.customBadges.splice(t, 1);
	window.customBadges.push({
		type: e,
		name: n,
		description: r,
		preview: !0,
		documentationURL: a || kt(e)
	}), console.info(`%c ${n} %c v${i} `, "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;", "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;");
}
var Jf = e((() => {
	Pt();
}));
//#endregion
//#region src/common/helpers/status-badge.js
function Yf(e = "") {
	return ap.get(e) || {
		value: e,
		label: e ? e.replaceAll("_", " ") : "Status",
		icon: "mdi:shape"
	};
}
function Xf(e = {}) {
	let t = !e.entity && (e.area || e.domain || e.device_class) ? "area_count" : "entity", n = e.state_source || t;
	if (["entity", "area_count"].includes(n)) return n;
	throw Error(`Invalid state_source "${n}". Expected "entity" or "area_count".`);
}
function Zf(e = {}) {
	let t = Xf(e), n = e.domain ? Yf(e.domain) : void 0;
	if (t === "area_count" && n?.requiresDeviceClass && !e.device_class) throw Error(`Orbit Status Badge (Dev) requires "device_class" for domain "${e.domain}".`);
	return t;
}
function Qf(e = {}) {
	let t = Xf(e), n = e.accent_on_color === "amber" && e.accent_off_color === "grey", r = e.color_mode === "native" || n, i = { ...e };
	return Object.keys(i).forEach((e) => {
		(i[e] === "" || i[e] === void 0) && delete i[e];
	}), i.show_state === !0 && delete i.show_state, i.show_icon === !0 && delete i.show_icon, i.show_name === !1 && delete i.show_name, i.show_entity_picture === !1 && delete i.show_entity_picture, t === "entity" ? (delete i.state_source, delete i.area, delete i.domain, delete i.device_class, i.state_content === "state" && delete i.state_content, i.tap_action?.action === "more-info" && delete i.tap_action) : (i.state_source = "area_count", delete i.entity, i.state_content === "count" && delete i.state_content, i.tap_action?.action === "none" && delete i.tap_action), i.hold_action?.action === "none" && delete i.hold_action, i.double_tap_action?.action === "none" && delete i.double_tap_action, i.icon_source === "domain" && (delete i.icon_source, delete i.icon, delete i.icon_on, delete i.icon_off), (r || [
		"",
		"theme",
		"state",
		"state-active"
	].includes(i.accent_on_color)) && delete i.accent_on_color, (r || [
		"",
		"theme",
		"state",
		"state-inactive"
	].includes(i.accent_off_color)) && delete i.accent_off_color, delete i.color_mode, i;
}
function $f(e, t = !1) {
	if (e.state === "unavailable") return "var(--state-unavailable-color)";
	let n = e.entity_id.split(".")[0], r = e.attributes || {};
	if (n === "light" && t && Array.isArray(r.rgb_color)) return tp(r.rgb_color);
	let i = ep(e.state), a = t ? "active" : "inactive";
	return [
		r.device_class ? `--state-${n}-${r.device_class}-${i}-color` : "",
		`--state-${n}-${i}-color`,
		`--state-${n}-${a}-color`,
		`--state-${a}-color`
	].filter(Boolean).reduceRight((e, t) => `var(${t}, ${e})`, "var(--state-icon-color, var(--secondary-text-color))");
}
function ep(e = "") {
	return e.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function tp(e) {
	let [t, n, r] = np(e);
	return n < .4 && (n < .1 ? r = 225 : n = .4), `#${rp(t, n, r).map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
function np([e, t, n]) {
	let [r, i, a] = [
		e,
		t,
		n
	].map((e) => e / 255), o = Math.max(r, i, a), s = o - Math.min(r, i, a), c = 0;
	return s && (c = o === r ? (i - a) / s % 6 : o === i ? (a - r) / s + 2 : (r - i) / s + 4), [
		(c * 60 + 360) % 360,
		o ? s / o : 0,
		o * 255
	];
}
function rp(e, t, n) {
	let r = n / 255 * t, i = e / 60, a = r * (1 - Math.abs(i % 2 - 1)), [o, s, c] = i < 1 ? [
		r,
		a,
		0
	] : i < 2 ? [
		a,
		r,
		0
	] : i < 3 ? [
		0,
		r,
		a
	] : i < 4 ? [
		0,
		a,
		r
	] : i < 5 ? [
		a,
		0,
		r
	] : [
		r,
		0,
		a
	], l = n / 255 - r;
	return [
		o,
		s,
		c
	].map((e) => Math.round((e + l) * 255));
}
var ip, ap, op = e((() => {
	ip = [
		{
			value: "light",
			label: "Lights",
			icon: "mdi:lightbulb"
		},
		{
			value: "switch",
			label: "Switches",
			icon: "mdi:toggle-switch",
			requiresDeviceClass: !0
		},
		{
			value: "fan",
			label: "Fans",
			icon: "mdi:fan"
		},
		{
			value: "cover",
			label: "Covers",
			icon: "mdi:window-shutter"
		},
		{
			value: "lock",
			label: "Locks",
			icon: "mdi:lock"
		},
		{
			value: "media_player",
			label: "Media players",
			icon: "mdi:play-box-multiple"
		},
		{
			value: "climate",
			label: "Climate",
			icon: "mdi:thermostat"
		},
		{
			value: "binary_sensor",
			label: "Binary sensors",
			icon: "mdi:radiobox-marked",
			requiresDeviceClass: !0
		}
	], ap = new Map(ip.map((e) => [e.value, e]));
})), sp = /* @__PURE__ */ t((() => {
	M(), Io(), Qs(), Pt(), B(), $u(), op(), Q();
	var e = "sensor.orbit_status_badge_preview", t = class extends j {
		static svgCache = z;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_colorPickerKey: { state: !0 },
			_colorPickerTab: { state: !0 },
			_iconPickerKey: { state: !0 },
			_iconPickerTab: { state: !0 },
			_orbitIconFiles: { state: !0 },
			_orbitIconFilesLoading: { state: !0 },
			_localIconFiles: { state: !0 },
			_localIconFilesLoading: { state: !0 },
			_contentExpanded: { state: !0 },
			_stateTypeExpanded: { state: !0 }
		};
		constructor() {
			super(), this._config = {}, this._colorPickerKey = "", this._colorPickerTab = "picker", this._iconPickerKey = "", this._iconPickerTab = "ha", this._orbitIconFiles = [], this._orbitIconFilesLoading = !1, this._localIconFiles = [], this._localIconFilesLoading = !1, this._contentExpanded = !1, this._stateTypeExpanded = !1;
		}
		connectedCallback() {
			super.connectedCallback(), wo(this), At(this, "orbit-status-badge-dev");
		}
		disconnectedCallback() {
			To(this), super.disconnectedCallback();
		}
		setConfig(e) {
			let t = e || {}, n = Qf(t), r = JSON.stringify(t) !== JSON.stringify(n);
			if (this._config = n, r) {
				let e = n;
				this.updateComplete.then(() => {
					this._config === e && this._dispatchConfigChanged(e);
				});
			}
		}
		_t(e, t) {
			return X(this.hass, e, t);
		}
		_updateConfig(e) {
			this._config = Qf(Qi(this._config, e)), this._dispatchConfigChanged(this._config);
		}
		_dispatchConfigChanged(e) {
			this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: e },
				bubbles: !0,
				composed: !0
			}));
		}
		_handleConfigUpdate(e, t) {
			let n = ["accent_on_color", "accent_off_color"].includes(e) && (!t || t === "theme");
			this._updateConfig({ [e]: n || t === "" ? void 0 : t });
		}
		_renderColor(e, t, n) {
			return ra.call(this, e, t, n);
		}
		_renderIconInput(e, t, n = "mdi:lightbulb or icon.svg") {
			return _i.call(this, e, t, n);
		}
		_getColorStyle(e) {
			return Do(e);
		}
		_getColorPickerValue(e) {
			return Oo(e);
		}
		_loadLocalIconFiles(e = "") {
			return bi.call(this, e);
		}
		_isImageIcon(e) {
			return hi(e);
		}
		_resolveIconPath(e) {
			return gi(e);
		}
		_getInlineSvg(e) {
			return R.call(this, e, { forceColor: !0 });
		}
		_getDeviceClassOptions() {
			let e = this._config?.domain || "", t = this._config?.device_class || "", n = /* @__PURE__ */ new Set();
			return e ? (Object.values(this.hass?.states || {}).forEach((t) => {
				if (!t.entity_id.startsWith(`${e}.`)) return;
				let r = t.attributes?.device_class;
				r && n.add(r);
			}), t && n.add(t), [...n].sort((e, t) => e.localeCompare(t)).map((e) => ({
				value: e,
				label: f(e)
			}))) : [];
		}
		_getStateContentHass() {
			let t = (/* @__PURE__ */ new Date()).toISOString(), n = {
				entity_id: e,
				state: "on",
				attributes: {
					count: 2,
					friendly_name: this.hass?.areas?.[this._config?.area]?.name || "Orbit status"
				},
				last_changed: t,
				last_updated: t,
				context: {
					id: "",
					parent_id: null,
					user_id: null
				}
			};
			return {
				...this.hass,
				entities: {
					...this.hass?.entities || {},
					[e]: {
						entity_id: e,
						platform: "orbit",
						area_id: this._config?.area || null,
						device_id: null
					}
				},
				states: {
					...this.hass?.states || {},
					[e]: n
				}
			};
		}
		render() {
			let t = this._getDeviceClassOptions(), i = ip.find((e) => e.value === this._config?.domain), a = [...this._config?.show_state === !1 ? [] : ["state"], ...this._config?.show_icon === !1 ? [] : ["icon"]], o = Xf(this._config), s = this._config?.entity || "", c = o === "entity" && s ? this.hass : this._getStateContentHass(), l = o === "entity" && s ? s : e;
			return D`
      <div class="wrapper">
        <div class="section">
          <ha-expansion-panel
            class="state-type-panel"
            outlined
            .expanded=${this._stateTypeExpanded}
            @expanded-changed=${(e) => {
				this._stateTypeExpanded = e.detail.expanded;
			}}
          >
            <ha-icon
              slot="leading-icon"
              icon="mdi:format-list-bulleted-type"
            ></ha-icon>
            <div slot="header" role="heading" aria-level="3">
              ${this._t("State type")}
            </div>
            <div class="content-panel-body">
              ${r.call(this, {
				stateSource: o,
				domainConfig: i,
				deviceClassOptions: t
			})}
            </div>
          </ha-expansion-panel>

          <ha-expansion-panel
            class="content-panel"
            outlined
            .expanded=${this._contentExpanded}
            @expanded-changed=${(e) => {
				this._contentExpanded = e.detail.expanded;
			}}
          >
            <ha-icon slot="leading-icon" icon="mdi:text-short"></ha-icon>
            <div slot="header" role="heading" aria-level="3">
              ${this._t("Content")}
            </div>
            <div class="content-panel-body">
              <div class="field">
                <ha-selector
                  .hass=${c}
                  .label=${this.hass?.localize("ui.panel.lovelace.editor.card.generic.name") || this._t("Name")}
                  .helper=${this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.name_helper") || this._t("Visible if selected in state content")}
                  .selector=${{ entity_name: { entity_id: l } }}
                  .value=${this._config?.name}
                  @value-changed=${(e) => this._handleConfigUpdate("name", e.detail.value)}
                ></ha-selector>
              </div>

              <div class="color-pair">
                ${this._renderColor(["Active", "Color"], "accent_on_color")}
                ${this._renderColor(["Inactive", "Color"], "accent_off_color")}
              </div>

              ${n.call(this, o)}

              <div class="field">
                <label>${this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements") || this._t("Displayed elements")}</label>
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ select: {
				mode: "list",
				multiple: !0,
				options: [{
					value: "state",
					label: this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements_options.state") || this._t("State")
				}, {
					value: "icon",
					label: this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements_options.icon") || this._t("Icon")
				}]
			} }}
                  .value=${a}
                  @value-changed=${(e) => {
				let t = e.detail.value || [];
				this._updateConfig({
					show_state: t.includes("state") ? void 0 : !1,
					show_icon: t.includes("icon") ? void 0 : !1
				});
			}}
                ></ha-selector>
              </div>

              <div class="field">
                <ha-selector
                  .hass=${c}
                  .label=${this.hass?.localize("ui.panel.lovelace.editor.card.heading.entity_config.state_content") || this._t("State content")}
                  .selector=${{ ui_state_content: {
				entity_id: l,
				allow_name: !0
			} }}
                  .value=${this._config?.state_content || (o === "entity" ? "state" : "count")}
                  @value-changed=${(e) => this._handleConfigUpdate("state_content", (() => {
				let t = e.detail.value;
				return !t || t === (o === "entity" ? "state" : "count") ? void 0 : t;
			})())}
                ></ha-selector>
              </div>
            </div>
          </ha-expansion-panel>

          ${J.call(this, {
				interactions: [
					{
						key: "tap_action",
						formKey: "tap_action",
						label: "Tap behavior",
						defaultAction: o === "entity" ? "more-info" : "none",
						defaultVisible: !0
					},
					{
						key: "hold_action",
						formKey: "hold_action",
						label: "Hold behavior",
						defaultAction: "none"
					},
					{
						key: "double_tap_action",
						formKey: "double_tap_action",
						label: "Double tap behavior",
						defaultAction: "none"
					}
				],
				context: {
					area_id: o === "area_count" ? this._config?.area : void 0,
					entity_id: o === "entity" ? this._config?.entity : void 0
				}
			})}
        </div>

        <div class="editor-version">
          ${this._t("Orbit Status Badge (Dev) v{version}", { version: Z.statusBadge })}
        </div>
      </div>
    `;
		}
		static styles = [...Zs, c`
      .content-panel,
      .state-type-panel {
        display: block;
        --expansion-panel-content-padding: 0;
        border-radius: var(--ha-border-radius-md);
        --ha-card-border-radius: var(--ha-border-radius-md);
      }

      .content-panel > [slot="header"],
      .state-type-panel > [slot="header"] {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
      }

      .content-panel ha-icon,
      .state-type-panel ha-icon {
        color: var(--secondary-text-color);
      }

      .content-panel-body {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
      }

      .native-picker-label {
        display: block;
      }
    `];
	};
	customElements.define("orbit-status-badge-dev-editor", t);
	function n(e = "entity") {
		let t = this._config?.icon_source || (this._config?.icon ? "custom" : "domain");
		return D`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${this._t("Icon")}</label>
        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [{
			label: this._t(e === "entity" ? "Entity" : "Domain"),
			value: "domain"
		}, {
			label: this._t("Custom"),
			value: "custom"
		}] } }}
          .value=${t}
          @value-changed=${(e) => e.detail.value === "custom" ? this._handleConfigUpdate("icon_source", "custom") : this._updateConfig({
			icon_source: void 0,
			icon: void 0,
			icon_on: void 0,
			icon_off: void 0
		})}
        ></ha-selector>
      </div>

      ${t === "custom" ? D`
            ${this._renderIconInput("", "icon")}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], "icon_on")}
              ${this._renderIconInput(["Inactive", "Icon"], "icon_off")}
            </div>
          ` : ""}
    </div>
  `;
	}
	function r({ stateSource: e, domainConfig: t, deviceClassOptions: n }) {
		let r = this._config?.domain || "";
		return D`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${this._t("Type")}</label>
        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{ button_toggle: { options: [{
			label: this._t("Entity"),
			value: "entity"
		}, {
			label: this._t("Area Count"),
			value: "area_count"
		}] } }}
          .value=${e}
          @value-changed=${(e) => {
			let t = e.detail.value || "entity";
			this._updateConfig(t === "entity" ? {
				state_source: void 0,
				area: void 0,
				domain: void 0,
				device_class: void 0,
				state_content: void 0
			} : {
				state_source: "area_count",
				entity: void 0,
				state_content: void 0
			});
		}}
        ></ha-selector>
      </div>

      ${e === "entity" ? D`
            <ha-selector
              .hass=${this.hass}
              .label=${this._t("Entity")}
              .selector=${{ entity: {} }}
              .value=${this._config?.entity || ""}
              @value-changed=${(e) => this._handleConfigUpdate("entity", e.detail.value || "")}
            ></ha-selector>
          ` : D`
            <div class="field">
              <span class="native-picker-label">${this._t("Area")}</span>
              <ha-selector
                .hass=${this.hass}
                .label=${""}
                .selector=${{ area: {} }}
                .required=${!1}
                .value=${this._config?.area || ""}
                @value-changed=${(e) => this._handleConfigUpdate("area", e.detail.value || "")}
              ></ha-selector>
            </div>

            <div class="field">
              <ha-generic-picker
                .hass=${this.hass}
                .value=${r}
                .label=${this._t("Domain")}
                .placeholder=${this._t("Domain")}
                use-top-label
                .getItems=${() => i.call(this)}
                .valueRenderer=${(e) => a.call(this, e)}
                .rowRenderer=${o}
                @value-changed=${(e) => this._updateConfig({
			domain: e.detail.value || void 0,
			device_class: void 0
		})}
              ></ha-generic-picker>
            </div>

            ${t?.requiresDeviceClass && n.length > 0 ? D`
                  <div class="field">
                    <ha-generic-picker
                      .hass=${this.hass}
                      .value=${this._config?.device_class || ""}
                      .label=${this._t("Device class")}
                      .placeholder=${this._t("Device class")}
                      use-top-label
                      .getItems=${() => s.call(this, r, n)}
                      .valueRenderer=${(e) => l.call(this, r, e)}
                      .rowRenderer=${(e, t) => u(e, t)}
                      @value-changed=${(e) => this._handleConfigUpdate("device_class", e.detail.value || void 0)}
                    ></ha-generic-picker>
                  </div>
                ` : ""}
          `}
    </div>
  `;
	}
	function i() {
		return ip.map((e) => ({
			id: e.value,
			primary: this._t(e.label),
			sorting_label: this._t(e.label),
			icon: e.icon
		}));
	}
	function a(e) {
		let t = ip.find((t) => t.value === e);
		return t ? D`
    <ha-icon slot="start" .icon=${t.icon}></ha-icon>
    <span slot="headline">${this._t(t.label)}</span>
  ` : "";
	}
	function o(e, t) {
		return D`
    <ha-combo-box-item type="button" compact .borderTop=${t !== 0}>
      <ha-icon slot="start" .icon=${e.icon}></ha-icon>
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
	}
	function s(e, t) {
		return t.filter((e) => e.value).map((t) => ({
			id: t.value,
			primary: t.label,
			sorting_label: t.label,
			stateObj: d(e, t.value)
		}));
	}
	function l(e, t) {
		return t ? D`
    <ha-state-icon
      slot="start"
      .stateObj=${d(e, t)}
    ></ha-state-icon>
    <span slot="headline">${f(t)}</span>
  ` : "";
	}
	function u(e, t) {
		return D`
    <ha-combo-box-item type="button" compact .borderTop=${t !== 0}>
      <ha-state-icon slot="start" .stateObj=${e.stateObj}></ha-state-icon>
      <span slot="headline">${e.primary}</span>
    </ha-combo-box-item>
  `;
	}
	function d(e, t) {
		return {
			entity_id: `${e}.orbit_status_badge_picker`,
			state: "off",
			attributes: { device_class: t }
		};
	}
	function f(e = "") {
		return e.replaceAll("_", " ").replace(/\b\w/g, (e) => e.toUpperCase());
	}
})), cp = /* @__PURE__ */ t((() => {
	M(), H(), at(), Jf(), L(), Vt(), Dn(), jn(), Vn(), op(), B(), Q(), sp();
	var e = class extends j {
		static svgCache = z;
		static properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_isHeadingBadge: { state: !0 }
		};
		static getConfigElement() {
			return document.createElement("orbit-status-badge-dev-editor");
		}
		static getStubConfig() {
			return {};
		}
		setConfig(e) {
			Zf(e || {}), this._config = Qf(e || {});
		}
		connectedCallback() {
			super.connectedCallback(), this._isHeadingBadge = !!this.closest("hui-heading-badge"), this.toggleAttribute("heading-badge", this._isHeadingBadge);
		}
		disconnectedCallback() {
			this._clearDoubleTapTimer(), this._cancelLongPress(), super.disconnectedCallback();
		}
		_getEntities() {
			if (Xf(this._config) === "entity") {
				let e = this.hass?.states?.[this._config?.entity];
				return e ? [e] : [];
			}
			let e = this._config?.domain || "", t = this._config?.area, n = this._config?.device_class || "", r = Yf(e);
			return !this.hass || !t || !e || r.requiresDeviceClass && !n ? [] : Object.values(this.hass.states || {}).filter((i) => i.entity_id.startsWith(`${e}.`) && zn(this.hass, i.entity_id) === t && (!r.requiresDeviceClass || i.attributes?.device_class === n));
		}
		_getModel() {
			let e = Xf(this._config), n = this._getEntities(), r = n.filter((e) => Bt(e)), i = r.length > 0, a = e === "entity" ? n[0] : void 0, o = a?.entity_id.split(".")[0] || this._config?.domain || "", s = Yf(o), c = this._config?.icon_source || (this._config?.icon ? "custom" : "domain"), l = this._config?.icon || "", u = i ? this._config?.icon_on || l : this._config?.icon_off || l, d = c === "custom" && u || s.icon, f = i ? this._config?.accent_on_color ?? this._config?.color : this._config?.accent_off_color, p = !f || [
				"theme",
				"state",
				"state-active",
				"state-inactive"
			].includes(f) ? "theme" : f, m = r[0] || n[0] || {
				entity_id: `${o}.orbit_status_badge`,
				state: i ? "on" : "off",
				attributes: this._config?.device_class ? { device_class: this._config.device_class } : {}
			}, h = e === "entity" ? m : {
				entity_id: `${o}.orbit_status_badge`,
				state: m.state,
				attributes: this._config?.device_class ? { device_class: this._config.device_class } : {}
			}, g = this.hass?.areas?.[this._config?.area]?.name || "", ee = this._config?.name, _ = this._config?.device_class ? t(this._config.device_class) : "", v = (a && this.hass?.formatEntityName ? this.hass.formatEntityName(a) : "") || g || _ || s.label, te = ee && this.hass?.formatEntityName && this.hass.formatEntityName(m, ee) || v, ne = c === "custom" ? i && this._config?.icon_on ? "icon_on" : !i && this._config?.icon_off ? "icon_off" : this._config?.icon ? "icon" : "" : "";
			return {
				entities: n,
				activeEntities: r,
				isOn: i,
				count: r.length,
				displayValue: e === "entity" ? m.state : r.length,
				label: te,
				icon: d,
				iconKey: ne,
				iconSource: c,
				stateSource: e,
				representativeStateObj: m,
				iconStateObj: h,
				displayStateObj: e === "entity" ? m : {
					entity_id: "sensor.orbit_status_badge_count",
					state: i ? "on" : "off",
					attributes: {
						count: r.length,
						friendly_name: te
					},
					last_changed: m.last_changed,
					last_updated: m.last_updated,
					context: m.context
				},
				defaultStateContent: e === "entity" ? "state" : "count",
				iconColor: p === "theme" ? $f(m, i) : ot(p)
			};
		}
		_handleAction(e, t = null) {
			return Ue.call(this, e, t);
		}
		_navigate(e) {
			return qe(e);
		}
		_clearDoubleTapTimer() {
			return We.call(this);
		}
		_cancelLongPress() {
			return kn.call(this);
		}
		get _LONG_PRESS_DELAY() {
			return 500;
		}
		_handlePointerDown(e, t) {
			if (N(this._config?.hold_action)) return On.call(this, e, t, this._config?.hold_action);
		}
		_handlePointerEnd(e) {
			return An.call(this, e);
		}
		_handleTap(e, t) {
			if (this._longPressTriggered) {
				this._longPressTriggered = !1;
				return;
			}
			let n = Xf(this._config) === "entity" ? { action: "more-info" } : { action: "none" };
			return F.call(this, e, t, this._config?.tap_action || n, this._config?.double_tap_action);
		}
		_handleDoubleTap(e, t) {
			return I.call(this, e, t, this._config?.double_tap_action);
		}
		_renderIcon(e) {
			let t = e.stateSource === "entity" && this._config?.show_entity_picture ? e.representativeStateObj.attributes?.entity_picture_local || e.representativeStateObj.attributes?.entity_picture : "";
			if (t) return D`<img class="entity-picture" slot="icon" src=${this.hass?.hassUrl ? this.hass.hassUrl(t) : t} alt="" />`;
			if (!yn(e.icon)) return D`
        <ha-state-icon
          slot="icon"
          .icon=${e.iconSource === "custom" ? e.icon : void 0}
          .stateObj=${e.iconSource === "custom" ? e.representativeStateObj : e.iconStateObj}
        ></ha-state-icon>
      `;
			if (yn(e.icon)) {
				let t = bn(e.icon), n = e.iconKey ? xn(this._config, e.iconKey) : !0;
				if (t.toLowerCase().split("?")[0].endsWith(".svg")) {
					let e = R.call(this, t, { forceColor: n });
					return e ? D`<span slot="icon" class="image-icon">${V(e)}</span>` : D`<img slot="icon" src=${t} alt="" />`;
				}
				return D`<img slot="icon" src=${t} alt="" />`;
			}
			return "";
		}
		render() {
			let e = this._getModel(), t = e.activeEntities[0]?.entity_id || e.entities[0]?.entity_id || null, n = N(this._config?.tap_action || (e.stateSource === "entity" ? { action: "more-info" } : { action: "none" })) || N(this._config?.hold_action) || N(this._config?.double_tap_action), r = this._config?.show_state !== !1, i = D`
      ${this._config?.show_icon === !1 ? "" : this._renderIcon(e)}
      ${r ? D`
            <state-display
              .hass=${this.hass}
              .stateObj=${e.displayStateObj}
              .content=${this._config?.state_content || e.defaultStateContent}
              .timeFormat=${this._config?.time_format}
              .name=${e.label}
              dash-unavailable
            ></state-display>
          ` : ""}
    `, a = {
				click: (e) => this._handleTap(e, t),
				dblclick: (e) => this._handleDoubleTap(e, t),
				pointerdown: (e) => this._handlePointerDown(e, t),
				pointerup: (e) => this._handlePointerEnd(e)
			};
			return this._isHeadingBadge ? D`
          <ha-heading-badge
            .type=${n ? "button" : "text"}
            style=${`--icon-color:${e.iconColor};`}
            .title=${`${e.label}: ${e.displayValue}`}
            aria-label=${`${e.label}: ${e.displayValue}`}
            @click=${a.click}
            @dblclick=${a.dblclick}
            @pointerdown=${a.pointerdown}
            @pointerup=${a.pointerup}
            @pointercancel=${() => this._cancelLongPress()}
            @pointerleave=${() => this._cancelLongPress()}
          >
            ${i}
          </ha-heading-badge>
        ` : D`
          <ha-badge
            .type=${n ? "button" : "badge"}
            .label=${this._config?.show_name ? e.label : void 0}
            .iconOnly=${!r && !this._config?.show_name}
            style=${`--badge-color:${e.iconColor};`}
            .title=${`${e.label}: ${e.displayValue}`}
            aria-label=${`${e.label}: ${e.displayValue}`}
            @click=${a.click}
            @dblclick=${a.dblclick}
            @pointerdown=${a.pointerdown}
            @pointerup=${a.pointerup}
            @pointercancel=${() => this._cancelLongPress()}
            @pointerleave=${() => this._cancelLongPress()}
          >
            ${i}
          </ha-badge>
        `;
		}
		static styles = c`
    .image-icon {
      width: var(--ha-badge-icon-size, 18px);
      height: var(--ha-badge-icon-size, 18px);
      display: block;
      line-height: 0;
      color: var(--icon-color, var(--badge-color));
    }

    :host([heading-badge]) .image-icon {
      width: 16px;
      height: 16px;
    }

    :host([heading-badge]) .entity-picture {
      width: 16px;
      height: 16px;
      border-radius: var(--ha-border-radius-circle);
      object-fit: cover;
    }

    .image-icon svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;
	};
	function t(e = "") {
		return e.replaceAll("_", " ").replace(/\b\w/g, (e) => e.toUpperCase());
	}
	qf({
		tag: "orbit-status-badge-dev",
		badgeClass: e,
		name: "Orbit Status Badge (Dev)",
		description: "Counts active entities in an area",
		version: Z.statusBadge
	});
})), lp = /* @__PURE__ */ t((() => {
	td(), $d(), xf(), Kf(), cp();
}));
//#endregion
export default lp();
