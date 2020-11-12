# Legacy System Domains and Collections

The legacy system generally uses the term _domain_ to refer to a conceptual grouping and the term
_collection_ to refer to a published set of objects from a particular domain.

The system currently supports the Enterprise ATT&CK and Mobile ATT&CK domains.
Support for these domains is hard coded into the editing software.

## Publishing Collections

In the legacy system, domains serve as the mechanism for choosing which objects will be included in a published collection.
A published collection for a domain will include:
- The matrices belonging to the domain
- The tactics referenced by those matrices
- The techniques belonging to the domain
- The groups, software, and mitigation objects related to those techniques
- The relationships that associate those techniques with other objects
- A single identity object
- A generated marking definition object


## Objects and Domains

### Matrices

Each matrix belongs to exactly one domain.
For matrix objects in the database (and in objects returned from the REST API), the domain is indicated in one location:
- The `external_id` of the first object in the `external_references` array is set to either `mitre-attack` or `mitre-mobile-attack`

### Tactics

Each tactic belongs to exactly one domain.
The domain is not stored in the tactic object.
Instead, a tactic belongs to the same domain as the matrix that references the tactic.
- The tactic is referenced by its stix id in the `tactic_refs` array in the matrix object

---
> **Side Note on Matching Techniques with Tactics**
>
> Each technique is associated with one or more tactics.
> - Associated tactics are listed in the in the technique's `kill_chain_phase` array,
>   in the `phase_name` property of the entries
> - The `phase_name` is matched to the `x_mitre_shortname` of the tactic object
> - However, tactics in different domains may have the same `x_mitre_shortname`
> - Therefore, the technique is only matched to tactics belonging to the same domain
---

### Techniques

Each technique belongs to exactly one domain.
For technique objects in the database (and in objects returned from the REST API), the domain is indicated in two locations:
- The `external_id` of the first object in the `external_references` array is set to either `mitre-attack` or `mitre-mobile-attack`
- The `x-mitre-collections` array includes the uuid corresponding to the domain
  - `95ecc380-afe9-11e4-9b6c-751b66dd541e` for Enterprise ATT&CK
  - `2f669986-b40b-4423-b720-4396ca6a462b` for Mobile ATT&CK

Only the second of these is used when publishing a collection.

##### Sub-Techniques

Sub-techniques always belong to the domain of their parent technique.

### Groups, Software, Mitigations

Group, software, and mitigation objects may be published as part of one or more domains.
The domain is not stored in the object.
A group, software, or mitigation object belongs to the domains of its associated techniques.
- Associated techniques are determined through relationship objects that
  - Reference the group, software, or mitigation object in the `source_ref` property and the
techinique in the `target_ref` property
  - Reference the technique in the `source_ref` property and the
group, software, or mitigation object in the `target_ref` property

### Relationships

Relationship objects may be published as part of one or more domains.
The domain is not stored in the object.
A relationship belongs to the domains of its associated techniques.
- A relationship is associated with a technique if the technique's stix id is found in the relationship's
`source_ref` or `target_ref` properties

### Identities

Identities are not associated with a domain.
When publishing a collection, all identities are included in the published bundle.
Currently, the only identity in the database is the default MITRE identity.

### Marking Definitions

Marking definitions are not associated with a domain.
When publishing a collection, a single marking definition is generated automatically.

## Domains and Object Definitions

In addition to the properties common to all techniques,
each domain defines one or more properties that are specific to that domain.
Specific properties are only defined for techniques&mdash;other object types do not have specific properties.

##### Enterprise ATT&CK Techniques
- `x_mitre_defense_bypassed`
- `x_mitre_effective_permissions`
- `x_mitre_impact_type`
- `x_mitre_system_requirements`
- `x_mitre_permissions_required`
- `x_mitre_remote_support`

##### Mobile ATT&CK Techniques
- `x_mitre_tactic_type`
