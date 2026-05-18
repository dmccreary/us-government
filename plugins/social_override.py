import re


def on_page_context(context, page, config, **kwargs):
    """Save custom image path from page metadata if it exists."""
    if page.meta and page.meta.get('image'):
        page.custom_image = page.meta['image']
    return context


def on_post_page(output, page, config, **kwargs):
    """Replace social plugin meta tags with our custom image."""
    if not hasattr(page, 'custom_image'):
        return output

    site_url = config['site_url'].rstrip('/')
    image_path = '/' + page.custom_image.lstrip('/')
    full_image_url = site_url + image_path

    og_tags = re.findall(r'<meta\s+property="og:image"[^>]*?>', output)
    for tag in og_tags:
        if '/assets/images/social/' in tag:
            new_tag = f'<meta property="og:image" content="{full_image_url}">'
            output = output.replace(tag, new_tag)

    twitter_tags = re.findall(r'<meta\s+name="twitter:image"[^>]*?>', output)
    for tag in twitter_tags:
        if '/assets/images/social/' in tag:
            new_tag = f'<meta name="twitter:image" content="{full_image_url}">'
            output = output.replace(tag, new_tag)

    return output
