/**
 * Scalar Design System — PinManager
 * Manages pinned page tabs stored in localStorage.
 * Each pin: { id: string, label: string, href: string }
 */
const PinManager = {
  KEY: 'scalar_pinned_tabs',

  getAll() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
    catch { return []; }
  },

  save(pins) {
    localStorage.setItem(this.KEY, JSON.stringify(pins));
  },

  has(id) {
    return this.getAll().some(p => p.id === id);
  },

  add(pin) {
    const pins = this.getAll();
    if (!pins.some(p => p.id === pin.id)) {
      pins.push(pin);
      this.save(pins);
    }
  },

  remove(id) {
    this.save(this.getAll().filter(p => p.id !== id));
  },

  toggle(pin) {
    this.has(pin.id) ? this.remove(pin.id) : this.add(pin);
  },
};
