#!/usr/bin/env python3
"""
Script pour ajouter automatiquement les metadonnees d'auteur a tous les fichiers Markdown
"""
import os
import re

AUTHOR_METADATA = """author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png"""

AUTHOR_FRONTMATTER = f"""---
{AUTHOR_METADATA}
---

"""

def has_frontmatter(content):
    """Verifie si le fichier a deja un front matter"""
    return content.strip().startswith('---')

def has_author_metadata(content):
    """Verifie si le front matter contient deja des metadonnees d'auteur"""
    if not has_frontmatter(content):
        return False
    # Cherche les metadonnees d'auteur dans le front matter
    frontmatter_match = re.search(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
    if frontmatter_match:
        frontmatter_content = frontmatter_match.group(1)
        return 'author:' in frontmatter_content
    return False

def add_author_to_file(filepath):
    """Ajoute les metadonnees d'auteur au fichier"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Si le fichier a deja des metadonnees d'auteur, on l'ignore
        if has_author_metadata(content):
            print(f"Ignore (deja des metadonnees d'auteur): {filepath}")
            return False
        
        # Si le fichier a un front matter mais pas de metadonnees d'auteur
        if has_frontmatter(content):
            # Ajoute les metadonnees d'auteur dans le front matter existant
            frontmatter_match = re.search(r'^(---\s*\n)(.*?)(\n---)', content, re.DOTALL)
            if frontmatter_match:
                frontmatter_start = frontmatter_match.group(1)
                frontmatter_content = frontmatter_match.group(2)
                frontmatter_end = frontmatter_match.group(3)
                rest_of_content = content[frontmatter_match.end():]
                
                # Ajoute les metadonnees d'auteur a la fin du front matter
                new_frontmatter_content = frontmatter_content.rstrip() + '\n' + AUTHOR_METADATA
                new_frontmatter = frontmatter_start + new_frontmatter_content + frontmatter_end
                new_content = new_frontmatter + rest_of_content
            else:
                # Si le front matter est mal forme, on ajoute au debut
                new_content = AUTHOR_FRONTMATTER + content
        else:
            # Si le fichier n'a pas de front matter, on l'ajoute
            new_content = AUTHOR_FRONTMATTER + content
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Ajoute: {filepath}")
        return True
    except Exception as e:
        print(f"Erreur avec {filepath}: {e}")
        return False

def process_directory(directory):
    """Traite tous les fichiers .md dans le repertoire"""
    count = 0
    for root, dirs, files in os.walk(directory):
        # Ignore certains dossiers
        if 'node_modules' in root or '.git' in root:
            continue
            
        for file in files:
            if file.endswith('.md') and file not in ['SUMMARY.md']:
                filepath = os.path.join(root, file)
                if add_author_to_file(filepath):
                    count += 1
    
    return count

if __name__ == '__main__':
    docs_dir = os.path.join(os.path.dirname(__file__), 'docs')
    print(f"Traitement du repertoire: {docs_dir}")
    print("-" * 50)
    
    count = process_directory(docs_dir)
    
    print("-" * 50)
    print(f"Termine! {count} fichiers modifies.")
