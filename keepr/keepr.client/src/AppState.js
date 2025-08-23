import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** ------ Account ------ */
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Profile.js').Profile} */
  user: {},
  /** @type {import('./models/Vault.js').Vault[]} */
  accountVaults: [],

  /** ------ Profiles ------ */
  /** @type {import('./models/Profile.js').Profile} */
  profile: null,
  /** @type {import('./models/Keep.js').Keep[]} */
  profileKeeps: [],
  /** @type {import('./models/Vault.js').Vault[]} */
  profileVaults: [],

  /** ------ Keeps ------ */
  /** @type {import('./models/Keep.js').Keep[]} */
  keeps: [],
  /** @type {import('./models/Keep.js').Keep | null} */
  keep: null,

  /** ------ Vaults ------ */
  /** @type {import('./models/Vault.js').Vault[]} */
  vaults: [],
  /** @type {import('./models/Vault.js').Vault | null} */
  vault: null,

  /** ------ VaultKeeps ------ */
  /** @type {import('./models/VaultKeep.js').VaultKeep[]} */
  vaultkeeps: [],
  /** @type {import('./models/VaultKeep.js').VaultKeep | null} */
  vaultkeep: null,

})
