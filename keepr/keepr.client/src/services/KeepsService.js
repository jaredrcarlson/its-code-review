import { AppState } from "../AppState.js";
import { Keep } from "../models/Keep.js";
import { api } from "./AxiosService.js";

class KeepsService {
  async create(data) {
    const res = await api.post('api/keeps', data)
    const keep = new Keep(res.data)
    AppState.keeps = [...AppState.keeps, keep]
    if (AppState.profile && AppState.profile.id == keep.creatorId) {
      AppState.profileKeeps = [...AppState.profileKeeps, keep]
    }
  }

  async get() {
    const res = await api.get('api/keeps')
    AppState.keeps = res.data.map(data => new Keep(data))
  }

  async getById(id) {
    const res = await api.get(`api/keeps/${id}`)
    AppState.keep = new Keep(res.data)
  }

  async update(id, data) {
    const res = await api.put(`api/keeps/${id}`, data)
    AppState.keep = new Keep(res.data)
    const i = AppState.keeps.findIndex(keep => keep.id == id)
    if (i != -1) {
      AppState.keeps.splice(i, 1, AppState.keep)
    }
  }

  async remove(id) {
    await api.delete(`api/keeps/${id}`)
    AppState.keep = null
    // const i = AppState.keeps.findIndex(keep => keep.id == id)
    // if (i != -1) {
    //   AppState.keeps.splice(i, 1)
    // }
    AppState.keeps = AppState.keeps.filter(keep => keep.id != id)
    AppState.profileKeeps = AppState.profileKeeps.filter(keep => keep.id != id)
  }

  setKeep(keep) {
    AppState.keep = keep
  }

  clearKeeps() {
    AppState.keeps = null
  }
}
export const keepsService = new KeepsService();