# A small grafana plugin to redirect people

When you're migrating from one grafana instance to another, it can be
helpful to tell people that they landed on the wrong page. This plugin
lets you define a panel that tells people about that fact (with a
configurable-with-markdown text), and then renders a link that takes
people to the same page on another grafana instance.

## Prerequisites

* You need to be able to run unsigned plugins (this plugin isn't available in the grafana registry).
* Your dashboards and other data needs to have the same UID in both grafana instances (if you used a good backup/restore tool, that should be the case!)
* Your links must be re-pointable by exchanging the hostname/URL scheme/port only. Path prefix changes and other text editing tricks are not supported.
