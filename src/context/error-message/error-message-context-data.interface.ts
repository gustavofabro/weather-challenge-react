export interface ErrorMessageContextData {
  error: string | null,
  updateErrorMessage: (error: string | null) => void
}
