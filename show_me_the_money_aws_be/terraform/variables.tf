
variable "tags" {
  description = "Application tags"
  default = {
    Owner      = "Mikhail Prorekhin"
    Allication = "Show me the money"
  }
}

variable "name" {
  description = "Name to use for Resources"
  default     = "show-me-the-money"
}

variable "xero_api_url" {
  description = "xero endpoint"
  default     = "http://your.url.ap-southeast-2.elb.amazonaws.com/api.xro/2.0"
}

variable "xero_get_balance" {
  description = "get balance"
  default     = "/Reports/BalanceSheet"
}
