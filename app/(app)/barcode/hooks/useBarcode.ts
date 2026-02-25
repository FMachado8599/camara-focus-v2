"use client"

import { useState } from "react"
import * as api from "@/lib/api/barcodeApi"

export function useBarcode() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function list() {
    setLoading(true)
    try {
      return await api.getBarcodes()
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function getById(id: string) {
    setLoading(true)
    try {
      return await api.getBarcodeById(id)
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function create(data: { name: string; value: string }) {
    setLoading(true)
    try {
      return await api.createBarcode(data)
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function update(
    id: string,
    data: { name: string; value: string }
  ) {
    setLoading(true)
    try {
      return await api.updateBarcode(id, data)
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function remove(id: string) {
    setLoading(true)
    try {
      return await api.deleteBarcode(id)
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    list,
    getById,
    create,
    update,
    remove,
    loading,
    error,
  }
}